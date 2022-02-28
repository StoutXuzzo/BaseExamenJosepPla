import { Component, OnInit, Input } from '@angular/core';
import { copyService, Service } from 'src/app/models/service.model';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['../../../app.component.css']
})

export class ServicesComponent implements OnInit {
  @Input() filterS = 0;

  services: Service[] = [];
  selectedservice: Service = new Service();
  currentUser: number = 1;

  constructor(private serviceService: ServicesService) { }

  ngOnInit(): void {
    this.serviceService.get().subscribe((veh: Service[]) => {
      this.services = veh;
    });
  }
  
  select(i: number){
    this.selectedservice = copyService(this.services[i]);
  }

  insert(){
    //if (this.validate() && this.validateNumber()){
      this.serviceService.insert(this.selectedservice);
      this.selectedservice = new Service();
    //}
  }

  update(){
    //if (this.validate()){
      let semaf = false;

    for (let i = 0; i < this.services.length; i++){
      if (this.services[i].id == this.selectedservice.id){
        this.serviceService.update(i, this.selectedservice);
        semaf = true;
        break;
      }
    }
    if (!semaf)
      this.insert();
    this.selectedservice = new Service();
    //}
  }

  delete(i: number){
    if (!confirm("Delete service " + this.services[i].name + "?"))
      return;
    this.serviceService.delete(this.services[i].id);
  }
}
