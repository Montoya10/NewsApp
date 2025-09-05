import { Injectable } from '@angular/core';
import { Http } from '../http/http';
import { environment } from 'src/environments/environment.prod';
import { INews } from 'src/app/interfaces/INews/inews';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(private httpSrv: Http) {}

  async getNewsByCategory(category: string): Promise<INews[]> {
    try {
      const url = `${environment.URL}?q=${category}&language=es&sortBy=publishedAt&apiKey=${environment.API_KEY}`;
      const response: any = await this.httpSrv.get(url);
      
      return response.articles || [];
    } catch (error) {
      console.error('Error fetching news:', error);
      return [];
    }
  }

  async getTopHeadlines(): Promise<INews[]> {
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${environment.API_KEY}`;
      const response: any = await this.httpSrv.get(url);
      
      return response.articles || [];
    } catch (error) {
      console.error('Error fetching headlines:', error);
      return [];
    }
  }
}