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
  // Noticias por categoría
  technologyNews: INews[] = [];
  sportsNews: INews[] = [];
  businessNews: INews[] = [];
  topHeadlines: INews[] = [];
  isLoading: boolean = true;
  
  // Variables para infinite scroll
  allNews: INews[] = [];
  displayedNews: INews[] = [];
  currentCategory = 'technology';
  isLoadingMore = false;

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
      // Cargar noticias iniciales de diferentes categorías
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

      // Para infinite scroll, usar una categoría principal
      this.allNews = [...tech]; // Empezar con tecnología
      this.displayedNews = this.allNews.slice(0, 10);

    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async onIonInfinite(event: any) {
    this.isLoadingMore = true;
    
    try {
      // Cargar más noticias de la API
      const moreNews = await this.newsService.getMoreNews();
      
      if (moreNews.length > 0) {
        // Agregar las nuevas noticias
        this.allNews = [...this.allNews, ...moreNews];
        this.displayedNews = [...this.displayedNews, ...moreNews];
        event.target.complete();
      } else {
        // No hay más noticias, deshabilitar el infinite scroll
        event.target.disabled = true;
      }
    } catch (error) {
      console.error('Error loading more news:', error);
      event.target.complete();
    } finally {
      this.isLoadingMore = false;
    }
  }

  doRefresh(event: any) {
    // Reiniciar la paginación
    this.newsService.resetPagination();
    
    // Recargar todo
    this.loadAllNews().then(() => {
      event.target.complete();
    });
  }

  async changeCategory(category: string | undefined) {
  if (!category) return; // Si es undefined, no hacer nada
  
  this.currentCategory = category;
  this.newsService.resetPagination();
  this.isLoading = true;
  
  try {
    const news = await this.newsService.getNewsByCategory(category);
    this.allNews = news;
    this.displayedNews = news.slice(0, 10);
  } catch (error) {
    console.error('Error changing category:', error);
  } finally {
    this.isLoading = false;
  }
}
}