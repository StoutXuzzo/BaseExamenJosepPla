import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vehicle, copyVehicle, jsonToVehicles } from '../models/vehicle.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VehiclesService {
  private vehicles: Vehicle[] = [];
  private _vehicles = new Subject<Vehicle[]>();

  private url = "http://localhost/s/api.php/vehicles";

  constructor(private http: HttpClient) {
    this.http.get(this.url).subscribe({
      next: (data) => {
        this.vehicles = jsonToVehicles(data);
        this._vehicles.next(this.vehicles);
      }
    });
   }

   get(){
     setTimeout(() => { this._vehicles.next(this.vehicles); }, 15);
     return this._vehicles.asObservable();
   }

   insert(vehicle: Vehicle){
    let veh = copyVehicle(vehicle);

    veh.id = 0;
    veh.date_created = "2022-01-01";
    veh.created_by = 1;

    const cabecera=new HttpHeaders({"Content-Type": "application/json;charset=utf-8"});
    this.http.post(this.url, veh, {headers:cabecera}).subscribe(
      (data : any) => {
        veh.id = data;
        this.vehicles.push(veh);
        this._vehicles.next(this.vehicles);
      }
    )
   }

   update(i: number, vehicle: Vehicle){
    let veh = copyVehicle(vehicle);
    this.vehicles[i] = veh;
    const cabecera=new HttpHeaders({"Content-Type": "application/json;charset=utf-8"});
    this.http.put(this.url+"/"+veh.id, veh, {headers:cabecera}).subscribe();
   }

   delete(id: number){
     this.http.delete(this.url+"/"+id).subscribe(
       (data:any) => {
         for (let i = 0; i < this.vehicles.length; i++){
           if (this.vehicles[i].id == id){
             this.vehicles.splice(i, 1);
             this._vehicles.next(this.vehicles);
             break;
           }
         }
       }
     )
   }
}
