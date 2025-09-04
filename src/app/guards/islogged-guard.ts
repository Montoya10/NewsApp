import {  Router,CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Storage } from 'src/app/shared/providers/storage/storage';

export const isloggedGuard: CanActivateFn = async (route, state) => {
  const storageSrv = inject(Storage);
  const router = inject(Router);
  const auth = await storageSrv.get<{ uuid: string }>('AUTH');

  if (router.url === '/' && auth) {
    return true;
  }
  router.navigate(['/home']);
  return false;
};