import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import ServiceResponse from 'src/types/ServiceResponse';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  signUp(): ServiceResponse<string> {
    return {
      status: 'CREATED',
      data: 'User created',
    };
  }

  signIn(): ServiceResponse<string> {
    return {
      status: 'SUCCESS',
      data: 'User logged in',
    };
  }
}
