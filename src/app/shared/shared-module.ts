
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from './components/button/button.component';
import { CountrySelectComponent } from './components/country-select/country-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from './services/user/user';
import { CountryService } from './services/countries/countries';
import { Uuid } from './providers/uuid/uuid';
import { Http } from './services/http/http';
import { NewsService } from './services/news/news';
import { NewsCardComponent } from './components/news-card/news-card.component';





const services = [User, CountryService, NewsService];
const providers = [Storage, Uuid, Http ];

@NgModule({
  declarations: [
    InputComponent, 
    ButtonComponent, 
    CountrySelectComponent,  NewsCardComponent
  
  ], 
  imports: [
    CommonModule, 
    IonicModule, 
    ReactiveFormsModule, 
    FormsModule,
  ],
  exports: [
    InputComponent, 
    ButtonComponent, 
    ReactiveFormsModule, 
    FormsModule,   
    CountrySelectComponent, 
    NewsCardComponent,
    
 
  ],
  providers: [...services, ...providers],
})
export class SharedModule { }