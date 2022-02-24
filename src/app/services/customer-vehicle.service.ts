import { Injectable } from '@angular/core';
import { CustomerVehicle, copyCustomerVehicle, jsonToCustomerVehicle } from '../models/customer-vehicle.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerVehicleService {
  private customersVehicles: CustomerVehicle[] = [];
  private _customersVehicles = new Subject<CustomerVehicle[]>(); 

  private url = "http://localhost/s/api.php/customer_vehicle";

  constructor(private http: HttpClient) {
    this.http.get(this.url).subscribe({
      next: (data) => {
        this.customersVehicles = jsonToCustomerVehicle(data);
        this._customersVehicles.next(this.customersVehicles);
      }
    });
   }

   get(){
     setTimeout(() => { this._customersVehicles.next(this.customersVehicles); }, 15);
     return this._customersVehicles.asObservable();
   }
}
