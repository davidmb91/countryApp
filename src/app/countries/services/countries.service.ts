import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1/';

  public cacheStore: CacheStore = {
    byCapital:    { term: '', countries: [] },
    byCountries:  { term: '', countries: [] },
    byRegion:     { countries: [] },
  }

  constructor(private http: HttpClient) { }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError( error => of([]) )
      )
  }

  searchContryByAlphaCode(alphaCode: string): Observable<Country> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${alphaCode}`).pipe(
      map( countries => countries[0]  ),
      catchError( error => of() )
    );
  }

  searchCapital(capital: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiUrl}/capital/${capital}`).pipe(
      tap( countries => this.cacheStore.byCapital = { term: capital, countries: countries} )
    );
  }

  searchCountry(country: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiUrl}/name/${country}`).pipe(
      tap( countries => this.cacheStore.byCountries = { term: country, countries: countries} )
    );
  }

  searchRegion(region: Region): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiUrl}/region/${region}`).pipe(
      tap( countries => this.cacheStore.byRegion = { region, countries} )
    );
  }

}
