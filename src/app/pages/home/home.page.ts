import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/shared/services/news/news';
import { INews } from 'src/app/interfaces/INews/inews';
import { Storage } from 'src/app/shared/providers/storage/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  technologyNews: INews[] = [];
  sportsNews: INews[] = [];
  businessNews: INews[] = [];
  topHeadlines: INews[] = [];
  isLoading: boolean = true;

  constructor(
    private readonly newsService: NewsService,
    private readonly storageSrv: Storage,
    private readonly router: Router
  ) {}

  async ngOnInit() {
    const response = await this.storageSrv.get('AUTH');
    if (!response) {
      this.router.navigate(['/login']);
      return;
    }

    await this.loadAllNews();
  }

  async loadAllNews() {
    this.isLoading = true;
    
    try {
      const [tech, sports, business, headlines] = await Promise.all([
        this.newsService.getNewsByCategory('technology'),
        this.newsService.getNewsByCategory('sports'),
        this.newsService.getNewsByCategory('business'),
        this.newsService.getTopHeadlines()
      ]);

      this.technologyNews = tech.slice(0, 5);
      this.sportsNews = sports.slice(0, 5);
      this.businessNews = business.slice(0, 5);
      this.topHeadlines = headlines.slice(0, 3);

    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      this.isLoading = false;
    }
  }

  doRefresh(event: any) {
    this.loadAllNews().then(() => {
      event.target.complete();
    });
  }
}