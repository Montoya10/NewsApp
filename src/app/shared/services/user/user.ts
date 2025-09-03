import { Injectable } from '@angular/core';
import { IUser, IUserCreate } from 'src/app/interfaces/IUser';
import { Uuid } from '../../providers/uuid/uuid';
import { Storage } from 'src/app/shared/providers/storage/storage';

@Injectable({
  providedIn: 'root',
})
export class User {
  constructor(
    private readonly storageSrv: Storage,
    private readonly uuidSrv: Uuid
  ) {}

  async register(user: IUserCreate): Promise<IUser> {
    const users: IUser[] = (await this.storageSrv.get('users')) || [];
    const isEmailExist = users.find((u) => u.email === user.email);
    if (isEmailExist) {
      throw new Error('El Email ya existe');
    }

    const newUser: IUser = {
      uuid: this.uuidSrv.get(),
      ...user,
      password: user.password, // Guarda la contraseña tal cual
    };

    users.push(newUser);
    this.storageSrv.set('users', JSON.stringify(users));

    return newUser;
  }

  async login(email: string, password: string): Promise<IUser> {
    const users: IUser[] = (await this.storageSrv.get('users')) || [];
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return user;
  }
}






