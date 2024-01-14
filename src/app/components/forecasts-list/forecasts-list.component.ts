import { Component, Inject, inject } from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {ActivatedRoute} from '@angular/router';
import {Forecast} from './forecast.type';
import { CacheService } from 'app/services/cache.service';
import { CACHE_DURATION } from 'app/app.module';

@Component({
  selector: 'app-forecasts-list',
  templateUrl: './forecasts-list.component.html',
  styleUrls: ['./forecasts-list.component.css']
})
export class ForecastsListComponent {

  zipcode: string;
  forecast: Forecast;
  cacheService = inject(CacheService);
  static CACHE_PREFIX = 'FORECAST-';

  constructor(protected weatherService: WeatherService, route : ActivatedRoute, @Inject(CACHE_DURATION) private cacheDuration: number) {
    route.params.subscribe(params => {
      this.zipcode = params['zipcode'];
      const cachedData = this.cacheService.getItem<Forecast>(ForecastsListComponent.CACHE_PREFIX+this.zipcode)
      if(!cachedData){
        weatherService.getForecast(this.zipcode)
        .subscribe(data => {
          this.forecast = data;
          this.cacheService.setItemWithExpiry('FORECAST-'+this.zipcode,data,cacheDuration);
        });
      } else {
        this.forecast = cachedData;
      }
    });
  }
}
