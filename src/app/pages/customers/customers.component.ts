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
  currentUser: number = 1;

  constructor(private customerService:CustomerService ) {  }

  ngOnInit(): void {
    this.customerService.get().subscribe((cus : Customer[]) => {
      this.customers = cus;
    });
  }
  
  insert(){
    if (this.validate() && this.validateName()){
      this.customerService.insert(this.selectedCustomer);
      this.selectedCustomer = new Customer();
    }
  }

  select(i: number){
    this.selectedCustomer = copyCustomer(this.customers[i]);
  }

  update(){
    if (this.validate()){
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
  }

  delete(i: number){
    
    if (!confirm("Delete customer " + this.customers[i].first_name + " " + this.customers[i].last_name + "?"))
      return;

    this.customerService.delete(this.customers[i].id);
  }

  validate(): boolean{
    if (this.currentUser != 1){
      confirm("You don't have permissions to modify the DataBase")
      return false;
    }

    if (this.selectedCustomer.first_name == ""){
      confirm("The fist name is not correct.")
      return false;
    }

    if (this.selectedCustomer.last_name == ""){
      confirm("The last name is not correct.")
      return false;
    }

    if (!this.selectedCustomer.phone.match("[0-9]{9}")){
      confirm("The phone is not correct.")
      return false;
    }

    if (!this.selectedCustomer.birthdate.match("[0-9]{4}-[0-9]{2}-[0-9]{2}")){
      confirm("The date is not correct, the correct format is \"YYYY-MM-DD\".")
      return false;
    }

    return true;
  }

  validateName(): boolean{
    for(let i = 0; i < this.customers.length; i++){
      if (this.customers[i].first_name == this.selectedCustomer.first_name && this.customers[i].last_name == this.selectedCustomer.last_name){
        confirm("This user already exist.")
        return false;
      }
    }
    return true;
  }
}
