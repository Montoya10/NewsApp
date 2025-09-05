import { Component, Input } from '@angular/core';
import { INews } from 'src/app/interfaces/INews/inews'; 
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
  standalone: false,
  
})

export class NewsCardComponent {
  @Input() news!: INews;
  @Input() showSource: boolean = true;

  
  handleImageError(event: any) {
    event.target.style.display = 'none';
    const parent = event.target.parentElement;
    const fallback = parent.querySelector('.no-image');
    if (fallback) {
      fallback.style.display = 'flex';
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  openArticle(url: string): void {
    window.open(url, '_blank');
  }
}