import { Module } from '@nestjs/common';
import { JobSubCategoriesController } from './sub-categories.controller';
import { JobSubCategoriesService } from './sub-categories.service';



@Module({
  controllers: [JobSubCategoriesController],
  providers: [JobSubCategoriesService],
})
export class SubCategoriesModule { }
