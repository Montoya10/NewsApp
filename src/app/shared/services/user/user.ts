import { Injectable } from '@angular/core';
import { IUser, IUserCreate } from 'src/app/interfaces/IUser';
import { Uuid } from '../../providers/uuid/uuid';
import { Storage } from 'src/app/shared/providers/storage/storage';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class User {
  constructor(
    private readonly storageSrv: Storage,
    private readonly uuidSrv: Uuid
    
  ) {}

  register(user: IUserCreate): IUser {
    const users = this.storageSrv.get<IUser[]>('users') || [];
    const isEmailExist = users.find((u) => u.email === user.email);
    if (isEmailExist) {
      throw new Error('El Email ya existe');
    }

    const newUser: IUser = {
      uuid: this.uuidSrv.get(),
      ...user,
      password: atob(user.password),
    };

    users.push(newUser);
    this.storageSrv.set('users', JSON.stringify(users));

    return newUser;
  }
}
