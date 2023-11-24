import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import ServiceResponse, { ServiceMessage } from 'src/types/ServiceResponse';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async signIn(
    email: string,
    password: string,
  ): Promise<ServiceResponse<{ access_token: string } | ServiceMessage>> {
    const foundUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!foundUser) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'User not found' },
      };
    }

    const isPasswordValid = await argon.verify(foundUser.password, password);

    if (!isPasswordValid) {
      return {
        status: 'UNAUTHORIZED',
        data: { message: 'Invalid credentials' },
      };
    }

    const payload = {
      sub: foundUser.id,
      email: foundUser.email,
    };

    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '1d',
    });

    return {
      status: 'SUCCESS',
      data: { access_token: token },
    };
  }
}
