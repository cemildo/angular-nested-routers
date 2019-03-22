import { Injectable } from '@angular/core';
import { DATA } from './cityDatas';



@Injectable({
  providedIn: 'root'
})
export class InfoServiceService {
  data: any;
  kanton: string;
  city: string;

  constructor() {
     this.data = DATA;
  }

  getData(place, kanton = null, city = null) {
    switch (place) {
      case 'kanton':
        return this.getKantons();
      break;
      case 'city':
        return this.getCities(kanton);
      break;
      case 'street':
        return this.getStreets(kanton, city);
      break;
      default:
        return this.getKantons();
    }
  }

  getKantons() {
    return this.data;
  }

  getCities(kanton) {
    if (!kanton) {
      return [];
    }
    return this.data
    .find(item => item.name === kanton)
    .children;
  }

  getStreets(kanton, city) {
    if (!kanton || !city) {
      return [];
    }
    const result =   this.data
    .find(item => item.name === kanton).children
    .find(item => item.name === city);
    return result ? result.children : [];
  }
}
