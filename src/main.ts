import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './common/contant/app.contant'; // https://docs.nestjs.com/techniques/configuration
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // https://docs.nestjs.com/techniques/
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ResponseSuccessInterceptor } from './common/interceptors/response-success.interceptor';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/interceptors/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Global Prefix - https://docs.nestjs.com/techniques/versioning
  app.setGlobalPrefix('api');
  //Format Response - https://docs.nestjs.com/interceptors
  app.useGlobalInterceptors(new LoggingInterceptor());
  //Format Response - https://docs.nestjs.com/interceptors
  // Khai báo Global Interceptor để tự động lọc dữ liệu dựa trên DTO (@Exclude, @Expose)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  //Format Response - https://docs.nestjs.com/interceptors
  app.useGlobalInterceptors(new ResponseSuccessInterceptor());
  //https://docs.nestjs.com/exception-filters
  app.useGlobalFilters(new HttpExceptionFilter());
  //Validation Pipe - https://docs.nestjs.com/techniques/validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,     // Loại bỏ các field không khai báo trong DTO
    transform: true,     // KÍCH HOẠT TRANSFORM: Biến String thành Date Object
    transformOptions: {
      enableImplicitConversion: true, // Tự động chuyển kiểu nếu có thể
    },
  }));
  const config = new DocumentBuilder()
    .setTitle('Fiverr API')
    .setDescription('Danh sách API cho hệ thống Fiverr')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Nhập token JWT của bạn',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-swagger', app, document);
  await app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}
bootstrap();

