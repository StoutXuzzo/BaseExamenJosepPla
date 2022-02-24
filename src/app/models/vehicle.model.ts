export class Vehicle{
    public id: number = 0;
    public created_by: number = -1;
    public date_created: string = "";
    public vehicle_number: string = "";
    public vehicle_brand: string = "";
    public vehicle_model: string = "";
    public vehicle_color: string = "";
    public date_manufacturing: string = "";
    public type_gas: string = "";
    public description: string = "";
}

export function copyVehicle(vehicle: Vehicle): Vehicle{
    let veh = new Vehicle();
    
    veh.id = vehicle.id;
    veh.created_by = vehicle.created_by;
    veh.date_created = vehicle.date_created;
    veh.vehicle_number = vehicle.vehicle_number;
    veh.vehicle_brand = vehicle.vehicle_brand;
    veh.vehicle_model = vehicle.vehicle_model;
    veh.vehicle_color = vehicle.vehicle_color;
    veh.date_manufacturing = vehicle.date_manufacturing;
    veh.type_gas = vehicle.type_gas;
    veh.description = vehicle.description;    

    return veh;
}

export function jsonToVehicles(vehicles: any): Vehicle[]{
    var nVehicles = vehicles['vehicles'].records.map(
        (vehicle: any) => {
            let veh = new Vehicle();

            veh.id = vehicle[0];
            veh.created_by = vehicle[1];
            veh.date_created = vehicle[2];
            veh.vehicle_number = vehicle[3];
            veh.vehicle_brand = vehicle[4];
            veh.vehicle_model = vehicle[5];
            veh.vehicle_color = vehicle[6];
            veh.date_manufacturing = vehicle[7];
            veh.type_gas = vehicle[8];
            veh.description = vehicle[9];

            return veh;
        }
    );
    return nVehicles;
}