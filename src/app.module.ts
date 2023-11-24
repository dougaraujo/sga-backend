import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ActivityModule } from './activity/activity.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
    }),
    AuthModule,
    ActivityModule,
    PrismaModule,
    UserModule,
  ],
})
export class AppModule {}
