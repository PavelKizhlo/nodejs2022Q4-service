import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    const allowedRoutes = ['auth', 'doc', ''];
    const baseUrl = req.url.split('/')[1];

    if (allowedRoutes.includes(baseUrl)) {
      return true;
    }

    const [bearer, token] = req.headers.authorization.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('access token is invalid');
    }

    try {
      this.jwtService.verify(token);
      return true;
    } catch (err) {
      throw new UnauthorizedException('access token is invalid or expired');
    }
  }
}
