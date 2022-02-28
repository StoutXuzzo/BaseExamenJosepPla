import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer, copyCustomer, jsonToCustomer } from '../models/customer.model';
import { Subject } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {
  private customers: Customer[] = [];
  private _customers = new Subject<Customer[]>();

  private url = "http://localhost/s/api.php/customers";

  constructor(private http:HttpClient) {
    this.http.get(this.url).subscribe({
      next: (data) => {
        this.customers = jsonToCustomer(data);
        this._customers.next(this.customers);
      }
    });
   }

   get(){
     // Turbio
     setTimeout(() => { this._customers.next(this.customers); }, 15);
     return this._customers.asObservable();
   }

   getCustomer(id: number): Customer{
     for (let i = 0; i < this.customers.length; i++){
      if (this.customers[i].id == id)
        return copyCustomer(this.customers[i]);
     }
     return new Customer();
   }

   getOne(id: number){
    return this.http.get(this.url+"/"+id);
   }

   insert(customer : Customer){
    let cus = copyCustomer(customer);

    cus.id = 0;
    let msj = new Date().toLocaleDateString().split("/");
    cus.date_entered = msj[2] + "-" + ((msj[1].length == 1)?"0":"") + msj[1] + "-" + ((msj[0].length == 1)?"0":"") + msj[0];
    cus.created_by = 1;
    
    const cabecera=new HttpHeaders({"Content-Type": "application/json;charset=utf-8"});
    this.http.post(this.url, cus, {headers:cabecera}).subscribe(
      (data : any) => {
        cus.id = data;
        this.customers.push(cus);
        this._customers.next(this.customers);
      }
    )
   }

   update(i: number,customer: Customer){
    let cus = copyCustomer(customer);
    this.customers[i] = cus;
    const cabecera=new HttpHeaders({"Content-Type": "application/json;charset=utf-8"});
    this.http.put(this.url+"/"+cus.id, cus, {headers:cabecera}).subscribe();
   }

   delete(id : number){
     this.http.delete(this.url+"/"+id).subscribe(
       (data:any) => {
         for(let i = 0; i < this.customers.length; i++){
           if (this.customers[i].id == id){
             this.customers.splice(i, 1);
             this._customers.next(this.customers);
             break;
           }
         }
       }
     )
   }
}

