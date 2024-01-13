import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CacheService } from './cache.service';

export const LOCATIONS : string = "locations";

@Injectable()
export class LocationService {

  locations : string[] = [];

  private locationSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  locations$ = this.locationSubject.asObservable();

  constructor(private cacheService : CacheService) {
    let locations = this.cacheService.getItem(LOCATIONS);
    if (locations){
      this.locations = locations;
      this.locationSubject.next(this.locations);
    }
  }

  addLocation(zipcode : string) {
    if(!this.locations.includes(zipcode)){
      this.locations.push(zipcode);
      this.cacheService.setItem(LOCATIONS,this.locations);
      this.locationSubject.next(this.locations);
    }
  }

  removeLocation(zipcode : string) {
    let index = this.locations.indexOf(zipcode);
    if (index !== -1){
      this.locations.splice(index, 1);
      this.cacheService.setItem(LOCATIONS,this.locations);
      this.locationSubject.next(this.locations);
    }
  }
}
