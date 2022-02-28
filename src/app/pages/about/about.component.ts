import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var require: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['../../app.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  company: string = "";
  decription: string =""; 
  objectives: string = "";
  employees: string = "";
  msjFromOtherComponents: string = "";

  sub: any;

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {this.msjFromOtherComponents = params['mode'];})

    var json = require("./about.json");

    this.company = json.company;
    this.decription = json.decription;
    this.objectives = json.objectives;
    this.employees = json.employees;    
  }

}
