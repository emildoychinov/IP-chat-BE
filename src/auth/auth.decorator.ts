import { SetMetadata, createParamDecorator } from '@nestjs/common';

/* if we wish to disable authentication on a given endpoint */
export const SKIP_AUTH_KEY = 'skipAuth';
export const SkipAuth = () => SetMetadata(SKIP_AUTH_KEY, true);

/* path parameter, which retrieves the user's data from the request's JWT */
export const AuthUser = createParamDecorator((_data, ctx) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user.user;
});
