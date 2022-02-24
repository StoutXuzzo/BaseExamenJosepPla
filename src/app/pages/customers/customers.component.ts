import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer, copyCustomer } from 'src/app/models/customer.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['../../app.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  selectedCustomer: Customer = new Customer();

  constructor(private customerService:CustomerService ) {  }

  ngOnInit(): void {
    this.customerService.get().subscribe((cus : Customer[]) => {
      this.customers = cus;
    });
  }
  
  insert(){
    this.customerService.insert(this.selectedCustomer);
    this.selectedCustomer = new Customer();
  }

  select(i: number){
    this.selectedCustomer = copyCustomer(this.customers[i]);
  }

  update(){
    let semaf = false;

    for (let i = 0 ; i < this.customers.length; i++){
      if (this.customers[i].id == this.selectedCustomer.id){
        this.customerService.update(i, this.selectedCustomer);
        semaf = true;
        break;
      }
    }
    if (semaf == false){
      this.insert()
    }
    this.selectedCustomer = new Customer();
  }

  delete(i: number){
    
    if (!confirm("Delete customer " + this.customers[i].first_name + " " + this.customers[i].last_name + "?"))
      return;

    this.customerService.delete(this.customers[i].id)
  }
}
