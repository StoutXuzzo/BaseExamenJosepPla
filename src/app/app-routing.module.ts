import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AboutComponent } from "./pages/about/about.component";
import { CustomerVehicleComponent } from "./pages/customer-vehicle/customer-vehicle.component";
import { CustomersComponent } from "./pages/customers/customers.component";
import { VehiclesComponent } from "./pages/vehicles/vehicles.component";

const routes: Routes = [
    { path: "customers", component: CustomersComponent },
    { path: "vehicles", component: VehiclesComponent },
    { path: "customervehicle", component: CustomerVehicleComponent },
    { path: "about", component: AboutComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }