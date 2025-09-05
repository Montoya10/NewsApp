import { Injectable } from '@angular/core';
import { Http } from '../http/http';
import { environment } from 'src/environments/environment.prod';
import { INews } from 'src/app/interfaces/INews/inews';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private currentPage = 1;
  private currentCategory = 'general';

  constructor(private httpSrv: Http) {}

  async getNewsByCategory(category: string, page: number = 1): Promise<INews[]> {
    try {
      this.currentCategory = category;
      const url = `${environment.URL}?q=${category}&language=es&page=${page}&pageSize=10&sortBy=publishedAt&apiKey=${environment.API_KEY}`;
      const response: any = await this.httpSrv.get(url);
      
      return response.articles || [];
    } catch (error) {
      console.error('Error fetching news:', error);
      return [];
    }
  }

  async getMoreNews(): Promise<INews[]> {
    this.currentPage++;
    return this.getNewsByCategory(this.currentCategory, this.currentPage);
  }

  async getTopHeadlines(page: number = 1): Promise<INews[]> {
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=us&page=${page}&pageSize=10&apiKey=${environment.API_KEY}`;
      const response: any = await this.httpSrv.get(url);
      
      return response.articles || [];
    } catch (error) {
      console.error('Error fetching headlines:', error);
      return [];
    }
  }

  resetPagination() {
    this.currentPage = 1;
  }
}