import {Inject, Injectable, Signal, signal} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {CurrentConditions} from '../components/current-conditions/current-conditions.type';
import {ConditionsAndZip} from '../models/conditions-and-zip.type';
import {Forecast} from '../components/forecasts-list/forecast.type';
import { CacheService } from './cache.service';
import { CACHE_DURATION } from '../app.module';
import { LocationService } from './location.service';

@Injectable({
  providedIn: "root"
})
export class WeatherService {

  static URL = 'https://api.openweathermap.org/data/2.5';
  static APPID = '5a4b2d457ecbef9eb2a71e480b947604';
  static ICON_URL = 'https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/';
  static CACHE_PREFIX = 'CONDITIONS-';
  private currentConditions = signal<ConditionsAndZip[]>([]);

  constructor(private http: HttpClient, private cacheService: CacheService, @Inject(CACHE_DURATION) private cacheDuration: number, private locationService: LocationService) {
    this.locationService.locations$.subscribe((locations) => {
      this.updateCurrentConditions(locations);
    })
   }
   
  addCurrentConditions(zipcode: string): void {
    const cachedData = this.cacheService.getItem<CurrentConditions>(WeatherService.CACHE_PREFIX+zipcode);
    if(!cachedData){
      // Here we make a request to get the current conditions data from the API. Note the use of backticks and an expression to insert the zipcode
      this.http.get<CurrentConditions>(`${WeatherService.URL}/weather?zip=${zipcode},us&units=imperial&APPID=${WeatherService.APPID}`)
        .subscribe(data => {
          this.currentConditions.update(conditions => [...conditions, {zip: zipcode, data}])
          this.cacheService.setItemWithExpiry('CONDITIONS-'+zipcode, data, this.cacheDuration);
        });
    } else {
      this.currentConditions.update(conditions => [...conditions, {zip: zipcode, data: cachedData}]);
    }
  }

  private updateCurrentConditions(locations: string[]){
    // remove deleted conditions
    this.currentConditions().forEach((condition) => {
      if (!locations.includes(condition.zip)) {
        this.removeCurrentConditions(condition.zip);
      }
    });
    // add new conditions
    locations.forEach((loc: string) => {
      if (
        this.currentConditions().find(
          (cond: ConditionsAndZip) => cond.zip === loc
        )
      )
        return;
      this.addCurrentConditions(loc);
    });
  }

  removeCurrentConditions(zipcode: string) {
    this.currentConditions.update(conditions => {
      for (let i in conditions) {
        if (conditions[i].zip == zipcode)
          conditions.splice(+i, 1);
      }
      return conditions;
    })
  }

  getCurrentConditions(): Signal<ConditionsAndZip[]> {
    return this.currentConditions.asReadonly();
  }

  getForecast(zipcode: string): Observable<Forecast> {
    // Here we make a request to get the forecast data from the API. Note the use of backticks and an expression to insert the zipcode
    return this.http.get<Forecast>(`${WeatherService.URL}/forecast/daily?zip=${zipcode},us&units=imperial&cnt=5&APPID=${WeatherService.APPID}`);

  }

  getWeatherIcon(id): string {
    if (id >= 200 && id <= 232)
      return WeatherService.ICON_URL + "art_storm.png";
    else if (id >= 501 && id <= 511)
      return WeatherService.ICON_URL + "art_rain.png";
    else if (id === 500 || (id >= 520 && id <= 531))
      return WeatherService.ICON_URL + "art_light_rain.png";
    else if (id >= 600 && id <= 622)
      return WeatherService.ICON_URL + "art_snow.png";
    else if (id >= 801 && id <= 804)
      return WeatherService.ICON_URL + "art_clouds.png";
    else if (id === 741 || id === 761)
      return WeatherService.ICON_URL + "art_fog.png";
    else
      return WeatherService.ICON_URL + "art_clear.png";
  }

}
