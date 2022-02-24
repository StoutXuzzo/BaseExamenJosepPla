export class Customer{
    public id: number = 0;
    public created_by: number = 0;
    public date_entered: string = "";
    public first_name: string = "";
    public last_name: string = "";
    public phone: string = "";
    public birthdate: string = "";
    public description: string = "";
    public address: string = "";
}

export function copyCustomer(customer: Customer) : Customer{
  let cus = new Customer();

  cus.id = customer.id;
  cus.created_by = customer.created_by;
  cus.date_entered = customer.date_entered;
  cus.first_name = customer.first_name;
  cus.last_name = customer.last_name;
  cus.phone = customer.phone;
  cus.birthdate = customer.birthdate;
  cus.description = customer.description;
  cus.address = customer.address;

  return cus;
}

export function jsonToCustomer(customers: any): Customer[] {
    var nCustomers = customers['customers'].records.map(
      (customer : any) => {
        let cus = new Customer();

        cus.id = customer[0];
        cus.created_by = customer[1];
        cus.date_entered = customer[2];
        cus.first_name = customer[3];
        cus.last_name = customer[4];
        cus.phone = customer[5];
        cus.birthdate = customer[6];
        cus.description = customer[7];
        cus.address = customer[8];

        return cus;
      }
    );
    return nCustomers;
  }