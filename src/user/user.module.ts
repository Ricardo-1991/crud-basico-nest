import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaService } from 'src/services/prisma.service';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
