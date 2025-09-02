import { Injectable } from '@angular/core';
import { IUser } from 'src/app/interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class User {
  constructor(private readonly storageSrv: Storage) {}

  register(user: IUserCreate): IUser {}
}
