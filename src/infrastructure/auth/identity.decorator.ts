import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface Identity {
  id: string;
  email: string;
  applicationId: string;
}

export const IdentityDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Identity => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
