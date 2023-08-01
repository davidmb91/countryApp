import { CountriesService } from './../../services/countries.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.countriesService.searchContryByAlphaCode(id))
    )
    .subscribe( country => {
      if (!country) {
        this.router.navigateByUrl('');
      }

      console.log('TENEMOS UN PAÍS');
      return;
    })
  }

}
