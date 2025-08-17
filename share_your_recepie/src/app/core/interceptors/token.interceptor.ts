
import { HttpInterceptorFn } from '@angular/common/http';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        'x-authorization': token
      }
    });

    return next(authReq);
  }

  return next(req);
};