import { Vehicle } from "./vehicle.model";

export class Service{
    public id: number = 0;
    public created_by: number = -1;
    public date_created: string = "";
    public name: string = "";
    public description: string = "";
    public status: string = "";
    public id_vehicle: number = 0;

    public vehicle: Vehicle = new Vehicle();
}

export function copyService(service: Service): Service{
    let ser = new Service();
    
    ser.id = service.id;
    ser.created_by = service.created_by;
    ser.date_created = service.date_created;
    ser.name = service.name;
    ser.description = service.description;    
    ser.status = service.status;
    ser.id_vehicle = service.id_vehicle;

    return ser;
}

export function jsonToServices(services: any): Service[]{
    var nServices = services['services'].records.map(
        (service: any) => {
            let ser = new Service();

            ser.id = service[0];
            ser.created_by = service[1];
            ser.date_created = service[2];
            ser.name = service[3];
            ser.description = service[4];
            ser.status = service[5];
            ser.id_vehicle = service[6];

            return ser;
        }
    );
    return nServices;
}