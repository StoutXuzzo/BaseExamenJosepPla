import { Component, OnInit } from '@angular/core';
import { CustomerVehicle } from 'src/app/models/customer-vehicle.model';
import { CustomerVehicleService } from 'src/app/services/customer-vehicle.service';

@Component({
  selector: 'app-customer-vehicle',
  templateUrl: './customer-vehicle.component.html',
  styleUrls: ['../../app.component.css']
})
export class CustomerVehicleComponent implements OnInit {
  customersVehicles: CustomerVehicle[] = [];
  selectedCustomerVehicle: CustomerVehicle = new CustomerVehicle();

  constructor(private customerVehicleService: CustomerVehicleService) { }

  ngOnInit(): void {
    this.customerVehicleService.get().subscribe((cusVeh: CustomerVehicle[]) => {
      this.customersVehicles = cusVeh;
    })
  }

  select(i: number){

  }

  delete(i: number){

  }
}
