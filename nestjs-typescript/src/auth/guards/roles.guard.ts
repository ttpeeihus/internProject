import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles || roles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.roles || user.roles.length === 0) {
      throw new UnauthorizedException('Truy cập bị từ chối, thông tin người dùng bị thiếu hoặc không hợp lệ');
    }

    const hasRole = roles.some(role => user.roles.includes(role));
    if (!hasRole) {
      throw new UnauthorizedException('Truy cập bị từ chối, không đủ quyền');
    }

    return true;
  }
}
