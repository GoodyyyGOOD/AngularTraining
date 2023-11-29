import { Meter } from './../models/meter';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_VERSION, BASE_PATH } from '../variable';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeterService {

  protected basePath ="/";
  protected apiVersion ="1";
    constructor(
      protected httpClient : HttpClient,
      @Inject(BASE_PATH) basePath : string,
      @Inject(API_VERSION) apiVersion : string,
    ) {
      this.basePath = basePath;
      this.apiVersion = apiVersion;
     }

     getMeters(search?: string, pageNumber?: number, pageSize?: number) : Observable<any>{
      let queryParameters = new HttpParams();
  
      if (search !== undefined && search !== null) {
        queryParameters = queryParameters.set('searchKey',search);
      }
      if (pageNumber !== undefined && pageNumber !== null) {
        queryParameters = queryParameters.set('pageNumber',pageNumber);
      }
      if (pageSize !== undefined && pageSize !== null) {
        queryParameters = queryParameters.set('pageSize',pageSize);
      }
  
      console.log ('queryParameters',queryParameters);
      return this.httpClient.get<any[]>(`${this.basePath}/api/v${this.apiVersion}/administration/meter`,{params: queryParameters})
  
    }
  
    insertMeter(meter: Meter) : Observable<any>{
      return this.httpClient.post<any[]>(`${this.basePath}/api/v${this.apiVersion}/administration/meter`,meter)
    }
  
    updateMeter(meter: Meter) : Observable<any>{
      return this.httpClient.put<any[]>(`${this.basePath}/api/v${this.apiVersion}/administration/meter/${meter.customerId}`,meter)
    }
  
    deleteMeter(id: number) : Observable<any>{
      return this.httpClient.delete<any[]>(`${this.basePath}/api/v${this.apiVersion}/administration/meter/${id}`)
    }
  
    getCustomerById(id: number): Observable<any> {
      return this.httpClient.get<any>
      (`${this.basePath}/api/v${this.apiVersion}/administration/meter/${id}`)
    }
  }
