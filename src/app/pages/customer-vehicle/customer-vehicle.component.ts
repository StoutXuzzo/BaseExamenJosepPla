import { Component, OnInit } from '@angular/core';
import { copyCustomerVehicle, CustomerVehicle } from 'src/app/models/customer-vehicle.model';
import { Customer } from 'src/app/models/customer.model';
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
    });
  }

  insert(){
    this.customerVehicleService.insert(this.selectedCustomerVehicle);
    this.selectedCustomerVehicle = new CustomerVehicle();
  }

  select(i: number){
    this.selectedCustomerVehicle = copyCustomerVehicle(this.customersVehicles[i]);
  }

  update(){
    let semaf = false;

    for(let i = 0; i < this.customersVehicles.length; i++){
      if (this.customersVehicles[i].id == this.selectedCustomerVehicle.id){
        this.customerVehicleService.update(i, this.selectedCustomerVehicle);
        semaf = true;
        break;
      }
    }

  }

  delete(i: number){
    if (!confirm("Delete customer-vehicle " + this.customersVehicles[i].id_customer + " - " + this.customersVehicles[i] + "?"))
      return;
    this.customerVehicleService.delete(this.customersVehicles[i].id);
  }
}
