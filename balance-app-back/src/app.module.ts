import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { FileController } from './file/file.controller';
import { FileModule } from './file/file.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, FileModule],
  controllers: [AppController, FileController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },]
})
export class AppModule {}
