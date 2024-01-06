import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private storage: Storage;

  constructor() { 
    this.storage = localStorage;
  }

  setItem<T>(key: string, data: T): void {
    const dataStr = JSON.stringify(data);
    this.storage.setItem(key,dataStr);
  }

  setItemWithExpiry<T>(key: string, data: T,expirySeconds: number): void {
    const expiryTimestamp = new Date().getTime() + expirySeconds*1000;
    const item = {
      data: JSON.stringify(data),
      expiry: expiryTimestamp
    }
    this.storage.setItem(key,JSON.stringify(item));
  }

  getItem<T>(key: string): T | null {
    const itemStr = this.storage.getItem(key);
    if(itemStr){
      const item = JSON.parse(itemStr);
      if(!item.expiry || item.expiry >= new Date().getTime()){
        return item.data;
      } else {
        this.removeItem(key)
      }
    }
    return null;
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }
}
