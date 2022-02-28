import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { copyService, jsonToServices, Service } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private services: Service[] = [];
  private _services = new Subject<Service[]>();

  private url = "http://localhost/s/api.php/services";

  constructor(private http: HttpClient) {
    this.http.get(this.url).subscribe({
      next: (data) => {
        this.services = jsonToServices(data);
        this._services.next(this.services);
      }
    });
   }

   get(){
     setTimeout(() => { this._services.next(this.services); }, 15);
     return this._services.asObservable();
   }

   insert(service: Service){
    let veh = copyService(service);

    veh.id = 0;
    let msj = new Date().toLocaleDateString().split("/");
    veh.date_created = msj[2] + "-" + ((msj[1].length == 1)?"0":"") + msj[1] + "-" + ((msj[0].length == 1)?"0":"") + msj[0];
    veh.created_by = 1;

    const cabecera=new HttpHeaders({"Content-Type": "application/json;charset=utf-8"});
    this.http.post(this.url, veh, {headers:cabecera}).subscribe(
      (data : any) => {
        veh.id = data;
        this.services.push(veh);
        this._services.next(this.services);
      }
    )
   }

   update(i: number, service: Service){
    let veh = copyService(service);
    this.services[i] = veh;
    const cabecera=new HttpHeaders({"Content-Type": "application/json;charset=utf-8"});
    this.http.put(this.url+"/"+veh.id, veh, {headers:cabecera}).subscribe();
   }

   delete(id: number){
     this.http.delete(this.url+"/"+id).subscribe(
       (data:any) => {
         for (let i = 0; i < this.services.length; i++){
           if (this.services[i].id == id){
             this.services.splice(i, 1);
             this._services.next(this.services);
             break;
           }
         }
       }
     )
   }
}
