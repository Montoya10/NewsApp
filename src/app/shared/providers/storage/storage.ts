import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Storage {
   constructor() {  }


   set(key:  string, data: string): void {
    localStorage.setItem(key, data);
   }
   get<T>(key:string): T |null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data):null;
   }

   delete(key:string): void {
    localStorage.removeItem(key);
   }
}
