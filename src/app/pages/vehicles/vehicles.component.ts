import { Component, OnInit } from '@angular/core';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { Vehicle, copyVehicle } from 'src/app/models/vehicle.model';


@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['../../app.component.css']
})
export class VehiclesComponent implements OnInit {
  vehicles: Vehicle[] = [];
  selectedVehicle: Vehicle = new Vehicle();

  constructor(private vehicleService: VehiclesService) { }

  ngOnInit(): void {
    this.vehicleService.get().subscribe((veh: Vehicle[]) => {
      this.vehicles = veh;
    });
  }
  
  select(i: number){
    this.selectedVehicle = copyVehicle(this.vehicles[i]);
  }

  insert(){
    this.vehicleService.insert(this.selectedVehicle);
    this.selectedVehicle = new Vehicle();
  }

  update(){
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

  delete(i: number){
    if (!confirm("Delete vehicle " + this.vehicles[i].vehicle_number + " - " + this.vehicles[i].vehicle_brand + " " + this.vehicles[i].vehicle_model + "?"))
      return;
    this.vehicleService.delete(this.vehicles[i].id);
  }
}
