import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Http {
  constructor(private readonly httpClient: HttpClient) {}

  async get<T>(url: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.httpClient.get<T>(url).subscribe({
        next(value) {
          resolve(value);
        },

        error(err) {
          reject(err);
        },
      });
    });
  }
}
