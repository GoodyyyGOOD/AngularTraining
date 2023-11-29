import { CustomerService } from 'app/common/services/customer.service';
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
export class CustomerResolver implements Resolve<any> {
  constructor (private customerService: CustomerService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.customerService.getCustomerById(route.params.id).toPromise().then((result) => {
      return{...result.data};
    }).catch(() =>{
      return{}
    });
  }
}
