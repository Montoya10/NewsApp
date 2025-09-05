import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Country {
  code: string;
  name: string;
  flag: string;
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1/all?fields=cca2,name,flags'; 

  constructor(private http: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(countries => 
        countries.map(country => ({
          code: country.cca2,
          name: country.name.common,
          flag: country.flags?.png || country.flags?.svg || ''
        }))
        .filter(country => country.flag)
        .sort((a, b) => a.name.localeCompare(b.name))
      ),
      catchError(error => {
        console.warn('API error, using default countries', error);
        return of(this.getDefaultCountries());
      })
    );
  }

  
  getDefaultCountries(): Country[] {
    return [
      { code: 'US', name: 'United States', flag: 'https://flagcdn.com/w320/us.png' },
      { code: 'MX', name: 'Mexico', flag: 'https://flagcdn.com/w320/mx.png' },
      { code: 'ES', name: 'Spain', flag: 'https://flagcdn.com/w320/es.png' },
      { code: 'CO', name: 'Colombia', flag: 'https://flagcdn.com/w320/co.png' },
      { code: 'AR', name: 'Argentina', flag: 'https://flagcdn.com/w320/ar.png' },
      { code: 'BR', name: 'Brazil', flag: 'https://flagcdn.com/w320/br.png' },
      { code: 'CL', name: 'Chile', flag: 'https://flagcdn.com/w320/cl.png' },
      { code: 'PE', name: 'Peru', flag: 'https://flagcdn.com/w320/pe.png' }
    ].sort((a, b) => a.name.localeCompare(b.name));
  }
}