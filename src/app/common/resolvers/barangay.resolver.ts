import { BarangayService } from './../services/barangay.service';
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
export class BarangayResolver implements Resolve<any> {
  constructor(private barangayService: BarangayService){

  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.barangayService
    .getBarangaysForDropDown()
    .toPromise()
    .then((result) => ([...result]))
    .catch(() => ([]));
  }
}
