import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ActivityModule } from './activity/activity.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, ActivityModule, PrismaModule],
})
export class AppModule {}
