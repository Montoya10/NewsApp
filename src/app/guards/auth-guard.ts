import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from 'src/app/shared/providers/storage/storage';

export const authGuard: CanActivateFn = async (route, state) => {
  const storageSrv = inject(Storage);
  const router = inject(Router);
  const auth = await storageSrv.get<{ uuid: string }>('AUTH');
  if (!auth) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
