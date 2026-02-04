import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './common/contant/app.contant'; // https://docs.nestjs.com/techniques/configuration
import { Res, ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ResponseSuccessInterceptor } from './common/interceptors/response-success.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Global Prefix - https://docs.nestjs.com/techniques/versioning
  app.setGlobalPrefix('api');
  //Format Response - https://docs.nestjs.com/interceptors
  app.useGlobalInterceptors(new LoggingInterceptor());
  //Format Response - https://docs.nestjs.com/interceptors
  app.useGlobalInterceptors(new ResponseSuccessInterceptor());
  //Validation Pipe - https://docs.nestjs.com/techniques/validation
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}
bootstrap();