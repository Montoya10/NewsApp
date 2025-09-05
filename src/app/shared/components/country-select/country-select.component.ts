// shared/components/country-select/country-select.component.ts
import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CountryService, Country } from '../../services/countries/countries';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss'],
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CountrySelectComponent),
      multi: true
    }
  ]
})
export class CountrySelectComponent implements OnInit, ControlValueAccessor {
  countries: Country[] = [];
  selectedCountry: Country | null = null;
  isLoading = true;
  isOpen = false;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(
    private countryService: CountryService,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    await this.loadCountries();
  }

  async loadCountries() {
    this.isLoading = true;
    
    try {
      this.countryService.getCountries().subscribe({
        next: (countries) => {
          this.countries = countries;
          this.isLoading = false;
        },
        error: async (error) => {
          console.warn('API falló, usando países por defecto', error);
          this.countries = this.countryService.getDefaultCountries();
          this.isLoading = false;
          
      
        }
      });
    } catch (error) {
      this.countries = this.countryService.getDefaultCountries();
      this.isLoading = false;
    }
  }

  private async showErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Información',
      message: 'Usando lista local de países',
      buttons: ['OK']
    });
    await alert.present();
  }

  writeValue(value: string): void {
    if (value && this.countries.length > 0) {
      this.selectedCountry = this.countries.find(c => c.code === value) || null;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onCountrySelect(event: any) {
    const countryCode = event.detail.value;
    this.selectedCountry = this.countries.find(c => c.code === countryCode) || null;
    this.onChange(countryCode);
    this.onTouched();
  }

  compareWith(o1: Country, o2: Country) {
    return o1 && o2 ? o1.code === o2.code : o1 === o2;
  }
}