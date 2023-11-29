import { MeterService } from './../services/meter.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeterResolver implements Resolve<boolean> {
  constructor (private meterService: MeterService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.meterService.getCustomerById(route.params.id).toPromise().then((result) => {
      return{...result.data};
    }).catch(() => {
      return{}
    });
  }
}
