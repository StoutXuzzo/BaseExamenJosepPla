import { Component, OnInit, Output } from '@angular/core';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { Vehicle, copyVehicle } from 'src/app/models/vehicle.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['../../app.component.css']
})
export class VehiclesComponent implements OnInit {
  vehicles: Vehicle[] = [];
  selectedVehicle: Vehicle = new Vehicle();
  currentUser: number = 1;
  filterF: number = 0;

  constructor(private vehicleService: VehiclesService) { }

  ngOnInit(): void {
    this.vehicleService.get().subscribe((veh: Vehicle[]) => {
      this.vehicles = veh;
    });
  }
  
  select(i: number){
    this.selectedVehicle = copyVehicle(this.vehicles[i]);
    this.filterF = this.selectedVehicle.id;
  }

  insert(){
    if (this.validate() && this.validateNumber()){
      this.vehicleService.insert(this.selectedVehicle);
      this.selectedVehicle = new Vehicle();
    }
  }

  update(){
    if (this.validate()){
      let semaf = false;

    for (let i = 0; i < this.vehicles.length; i++){
      if (this.vehicles[i].id == this.selectedVehicle.id){
        this.vehicleService.update(i, this.selectedVehicle);
        semaf = true;
        break;
      }
    }
    if (!semaf)
      this.insert();
    this.selectedVehicle = new Vehicle();
    }
  }

  delete(i: number){
    if (!confirm("Delete vehicle " + this.vehicles[i].vehicle_number + " - " + this.vehicles[i].vehicle_brand + " " + this.vehicles[i].vehicle_model + "?"))
      return;
    this.vehicleService.delete(this.vehicles[i].id);
  }

  validate(): boolean{
    if (this.selectedVehicle.vehicle_number == ""){
      confirm("The vehicle number ins not correct.")
      return false;
    }
    if (this.selectedVehicle.vehicle_brand == ""){
      confirm("The vehicle brand ins not correct.")
      return false;
    }
    if (this.selectedVehicle.vehicle_model == ""){
      confirm("The vehicle model ins not correct.")
      return false;
    }
    if (this.selectedVehicle.vehicle_color == ""){
      confirm("The vehicle color ins not correct.")
      return false;
    }
    if (!this.selectedVehicle.date_manufacturing.match("[0-9]{4}-[0-9]{2}-[0-9]{2}")){
      confirm("The manufacturing date is not correct, the correct format is \"YYYY-MM-DD\".")
      return false;
    }
    if (this.selectedVehicle.type_gas == ""){
      confirm("The gas type is not correct")
      return false;
    }
    return true;
  }

  validateNumber(): boolean{
    for(let i = 0; i < this.vehicles.length; i++){
      if (this.selectedVehicle.vehicle_number == this.vehicles[i].vehicle_number){
        confirm("This vehicle already exist.")
        return false;
      }
    }
    return true;
  }
/*
  filtrar(veh: Vehicle): boolean{
    if (this.filter != ""){
      if ((veh.id + "") == this.filter){
        return true;
      }
    }
    return false;
  }*/
}
