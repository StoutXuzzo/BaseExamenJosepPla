export class CustomerVehicle{
    public id: number = 0;
    public created_by: number = 0;
    public date_created: string = "";
    public id_customer: number = 0;
    public id_vehicle: number = 0;
}

export function copyCustomerVehicle(customerVehicle: CustomerVehicle): CustomerVehicle{
    let cusVeh = new CustomerVehicle();

    cusVeh.id = customerVehicle.id;
    cusVeh.created_by = customerVehicle.created_by;
    cusVeh.date_created = customerVehicle.date_created;
    cusVeh.id_customer = customerVehicle.id_customer;
    cusVeh.id_vehicle = customerVehicle.id_vehicle;

    return cusVeh;
}

export function jsonToCustomerVehicle(customersVehicles: any): CustomerVehicle[]{
    var nCustomersVehicles = customersVehicles['customer_vehicle'].records.map(
        (customerVehicle : any) => {
            let cusVeh = new CustomerVehicle();

            cusVeh.id = customerVehicle[0];
            cusVeh.created_by = customerVehicle[1];
            cusVeh.date_created = customerVehicle[2];
            cusVeh.id_vehicle = customerVehicle[3];
            cusVeh.id_customer = customerVehicle[4];

            return cusVeh;
        }
    );
    return nCustomersVehicles;
}