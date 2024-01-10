import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export const LOCATIONS : string = "locations";

@Injectable()
export class LocationService {

  locations : string[] = [];

  private locationSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  locations$ = this.locationSubject.asObservable();

  constructor() {
    let locString = localStorage.getItem(LOCATIONS);
    if (locString){
      this.locations = JSON.parse(locString);
      this.locationSubject.next(this.locations);
    }
  }

  addLocation(zipcode : string) {
    this.locations.push(zipcode);
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
    this.locationSubject.next(this.locations);
  }

  removeLocation(zipcode : string) {
    let index = this.locations.indexOf(zipcode);
    if (index !== -1){
      this.locations.splice(index, 1);
      localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
      this.locationSubject.next(this.locations);
    }
  }
}
