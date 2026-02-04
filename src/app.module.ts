import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules-api/auth/auth.module';
import { UserModule } from './modules-api/user/user.module';
import { JobModule } from './modules-api/job/job.module';
import { CategoryModule } from './modules-api/category/category.module';
import { BookingModule } from './modules-api/booking/booking.module';
import { CommentModule } from './modules-api/comment/comment.module';
import { PrismaModule } from './modules-system/prisma/prisma.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, JobModule, CategoryModule, BookingModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
