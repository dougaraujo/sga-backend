import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import ServiceResponse, { ServiceMessage } from 'src/types/ServiceResponse';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<ServiceResponse<ServiceMessage>> {
    try {
      const userHash = await argon.hash(createUserDto.password);
      const userWithHash = {
        ...createUserDto,
        password: userHash,
      };
      await this.prismaService.user.create({
        data: userWithHash,
      });

      return {
        status: 'CREATED',
        data: {
          message: 'User created successfully',
        },
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return {
            status: 'FORBIDDEN',
            data: {
              message: 'Email already exists',
            },
          };
        }
      }
    }
  }

  async findAll(): Promise<ServiceResponse<User[]>> {
    const users = await this.prismaService.user.findMany();

    for (const user in users) {
      delete users[user].password;
    }

    return {
      status: 'SUCCESS',
      data: users,
    };
  }

  async findOne(id: number): Promise<ServiceResponse<User | ServiceMessage>> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      return {
        status: 'NOT_FOUND',
        data: {
          message: 'User not found',
        },
      };
    }

    delete user.password;

    return {
      status: 'SUCCESS',
      data: user,
    };
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<ServiceResponse<User | ServiceMessage>> {
    try {
      const updatedUser = await this.prismaService.user.update({
        where: { id },
        data: updateUserDto,
      });

      delete updatedUser.password;
      return {
        status: 'SUCCESS',
        data: updatedUser,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          return {
            status: 'NOT_FOUND',
            data: {
              message: 'User not found',
            },
          };
        }
      }
    }
  }

  async remove(id: number): Promise<ServiceResponse<ServiceMessage>> {
    const deletedUser = await this.prismaService.user.delete({
      where: { id },
    });
    if (!deletedUser) {
      return {
        status: 'NOT_FOUND',
        data: {
          message: 'User not found',
        },
      };
    }

    return {
      status: 'SUCCESS',
      data: {
        message: 'User deleted successfully',
      },
    };
  }
}
