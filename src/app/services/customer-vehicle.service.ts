import { Injectable } from '@angular/core';
import { CustomerVehicle, copyCustomerVehicle, jsonToCustomerVehicle } from '../models/customer-vehicle.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CustomerService } from './customer.service';

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

   insert(customerVehicle: CustomerVehicle){
    let cusVeh = copyCustomerVehicle(customerVehicle);

    cusVeh.id = 0;
    cusVeh.date_created = "2022-01-01";
    cusVeh.created_by = 1;

    const cabecera=new HttpHeaders({"Content-Type": "application/json;charset=utf-8"});
    this.http.post(this.url, cusVeh, {headers:cabecera}).subscribe(
      (data: any) => {
        cusVeh.id = data;
        this.customersVehicles.push(cusVeh);
        this._customersVehicles.next(this.customersVehicles);
      }
    )
   }

   update(i: number, customerVehicle: CustomerVehicle){
    let cusVeh = copyCustomerVehicle(customerVehicle);
    this.customersVehicles[i] = cusVeh;
    const cabecera=new HttpHeaders({"Content-Type": "application/json;charset=utf-8"}); 
    this.http.put(this.url+"/"+cusVeh.id, cusVeh, {headers:cabecera}).subscribe();
   }

   delete(id: number){
     this.http.delete(this.url+"/"+id).subscribe(
       (data: any) => {
         for (let i = 0; i < this.customersVehicles.length; i++){
           if (this.customersVehicles[i].id == id){
            this.customersVehicles.splice(i, 1);
            break;
           }
         }
       }
     )
   }
}