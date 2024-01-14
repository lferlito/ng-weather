import { BrowserModule } from '@angular/platform-browser';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ZipcodeEntryComponent } from './components/zipcode-entry/zipcode-entry.component';
import {LocationService} from "./services/location.service";
import { ForecastsListComponent } from './components/forecasts-list/forecasts-list.component';
import {WeatherService} from "./services/weather.service";
import { CurrentConditionsComponent } from './components/current-conditions/current-conditions.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import {RouterModule} from "@angular/router";
import {routing} from "./app.routing";
import {HttpClientModule} from "@angular/common/http";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';

export const CACHE_DURATION = new InjectionToken<number>('cacheDuration');

@NgModule({
  declarations: [
    AppComponent,
    ZipcodeEntryComponent,
    ForecastsListComponent,
    CurrentConditionsComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    routing,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    SharedModule
  ],
  providers: [LocationService, 
    WeatherService, 
    [{
      provide: CACHE_DURATION, 
      useValue: 7200 // default 7200 seconds = 2 hours
    }]],
  bootstrap: [AppComponent]
})
export class AppModule { }
