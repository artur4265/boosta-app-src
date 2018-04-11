import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {


  constructor(public http:Http) { 
    console.log('service work')
  }

  sendData(url, allValue) {
    return this.http.post(url, allValue)
      .map(res => res.json())
  }

}
