import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { CustomerVehicleComponent } from './pages/customer-vehicle/customer-vehicle.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    VehiclesComponent,
    CustomerVehicleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
