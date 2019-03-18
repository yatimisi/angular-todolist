import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  log(data: any, message = '') {
    if (environment.production) { return; }

    if (message !== '') {
      console.log(message);
    }

    console.log(data);
  }
}
