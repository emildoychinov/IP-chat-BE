import { SetMetadata } from '@nestjs/common';

// export const Auth = (...args: string[]) => SetMetadata('auth', args);

/* if we wish to disable authentication on a given endpoint */
export const SKIP_AUTH_KEY = 'skipAuth';
export const SkipAuth = () => SetMetadata(SKIP_AUTH_KEY, true);
