import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { copyCustomerVehicle, CustomerVehicle } from 'src/app/models/customer-vehicle.model';
import { Customer } from 'src/app/models/customer.model';
import { Vehicle } from 'src/app/models/vehicle.model';
import { CustomerVehicleService } from 'src/app/services/customer-vehicle.service';
import { CustomerService } from 'src/app/services/customer.service';
import { VehiclesService } from 'src/app/services/vehicles.service';

@Component({
  selector: 'app-customer-vehicle',
  templateUrl: './customer-vehicle.component.html',
  styleUrls: ['../../app.component.css']
})

export class CustomerVehicleComponent implements OnInit {

  @Output() cusVehMsj = new EventEmitter<string>();

  sendInfo(){
    this.cusVehMsj.emit("Hello, from Customer-Vehicle component!")
  }

  customersVehicles: CustomerVehicle[] = [];
  customers: Customer[] = [];
  vehicles: Vehicle[] = [];
  selectedCustomerVehicle: CustomerVehicle = new CustomerVehicle();
  selectedCustomer: number = -1;
  selectedVehicle: number = -1;

  constructor(private customerVehicleService: CustomerVehicleService, private customerService: CustomerService, private vehicleService: VehiclesService) { }

  ngOnInit(): void {

    this.customerVehicleService.get().subscribe((cusVeh: CustomerVehicle[]) => {
      this.customersVehicles = cusVeh;
      this.asignarRelaciones();
      console.log(cusVeh)
    });
    this.customerService.get().subscribe((cus: Customer[]) => {
      this.customers = cus;
      this.asignarRelaciones();
    });
    this.vehicleService.get().subscribe((veh: Vehicle[]) => {
      this.vehicles = veh;
      this.asignarRelaciones();
    });
  }

  asignarRelaciones(){
    for(let i = 0; i < this.customersVehicles.length; i++){
      this.customersVehicles[i].customer = this.customerService.getCustomer(this.customersVehicles[i].id_customer);
      this.customersVehicles[i].vehicle = this.vehicleService.getVehicle(this.customersVehicles[i].id_vehicle);
    }
  }

  insert(){
    if(this.validate() && this.validateUnique()){
      this.selectedCustomerVehicle.id_customer = this.customers[this.selectedCustomer].id;
      this.selectedCustomerVehicle.id_vehicle = this.vehicles[this.selectedVehicle].id;
      this.selectedCustomerVehicle.customer = this.customers[this.selectedCustomer];
      this.selectedCustomerVehicle.vehicle = this.vehicles[this.selectedVehicle];

      this.customerVehicleService.insert(this.selectedCustomerVehicle);
      this.selectedCustomerVehicle = new CustomerVehicle();
    }
  }

  select(i: number){
    this.selectedCustomerVehicle = copyCustomerVehicle(this.customersVehicles[i]);
    for (let i = 0; i < this.customers.length; i++){
      if (this.customers[i].id == this.selectedCustomerVehicle.id_customer){
        this.selectedCustomer = i;
        break;
      }
    }
    for (let i = 0; i < this.vehicles.length; i++){
      if (this.vehicles[i].id == this.selectedCustomerVehicle.id_vehicle){
        this.selectedVehicle = i;
        break;
      }
    }
  }

  update(){
    if (this.validate()){
      let semaf = false;

      for(let i = 0; i < this.customersVehicles.length; i++){
        if (this.customersVehicles[i].id == this.selectedCustomerVehicle.id){
          this.selectedCustomerVehicle.id_customer = this.customers[this.selectedCustomer].id;
          this.selectedCustomerVehicle.id_vehicle = this.vehicles[this.selectedVehicle].id;
          this.selectedCustomerVehicle.customer = this.customers[this.selectedCustomer];
          this.selectedCustomerVehicle.vehicle = this.vehicles[this.selectedVehicle];
          this.customerVehicleService.update(i, this.selectedCustomerVehicle);
          semaf = true;
          break;
        }
      }
    }

  }

  delete(i: number){
    if (!confirm("Delete customer-vehicle " + this.customersVehicles[i].id_customer + " - " + this.customersVehicles[i].id_vehicle + "?"))
      return;
    this.customerVehicleService.delete(this.customersVehicles[i].id);
  }

  validate(): boolean{
    if(this.selectedCustomer == -1){
      confirm("Select a customer.")
      return false;
    }
    if(this.selectedVehicle == -1){
      confirm("Select a vehicle.")
      return false;
    }
    return true;
  }
  validateUnique(): boolean{
    for(let i = 0; i < this.customersVehicles.length; i++){
      if (this.customers[this.selectedCustomer].id == this.customersVehicles[i].id_customer
        && this.vehicles[this.selectedVehicle].id == this.customersVehicles[i].id_vehicle){
          confirm("This relation already exist.")
          return false;
        }
    }
    return true;
  }
}
