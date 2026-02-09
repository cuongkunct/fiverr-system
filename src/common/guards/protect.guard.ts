import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import { TokenService } from 'src/modules-system/token/token.service';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';
import { ROLES_KEY } from '../decorators/role.decorator';

@Injectable()
export class ProtectGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private reflector: Reflector,
    private prisma: PrismaService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    // const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
    //   context.getHandler(),
    //   context.getClass(),
    // ]);
    // console.log("requiredRoles", requiredRoles);
    // if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.tokenService.verifyAccessToken(token);
      console.log("payload", payload);

      const userExist = await this.prisma.users.findUnique({
        where: {
          id: (payload as any).userId,
        },
      });

      if (!userExist) {
        throw new UnauthorizedException('Unauthorized');
      }

      // if (!requiredRoles.includes(userExist.role)) {
      //   throw new UnauthorizedException('Unauthorized');
      // }

      request['user'] = userExist;
    } catch (err) {
      switch (err.constructor) {
        case TokenExpiredError:
          throw new ForbiddenException(err.message);
        default:
          throw new UnauthorizedException();
      }
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
