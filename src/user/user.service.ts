import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import ServiceResponse, { ServiceMessage } from 'src/types/ServiceResponse';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService = new PrismaService()) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<ServiceResponse<User | ServiceMessage>> {
    try {
      const createdUser = await this.prismaService.user.create({
        data: createUserDto,
      });

      delete createdUser.password;

      return {
        status: 'CREATED',
        data: createdUser,
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
