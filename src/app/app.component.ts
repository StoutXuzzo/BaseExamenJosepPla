import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BaseExamenJosepPla';

  msj:string = "";

  reciveInfo(msjCV: string){
    this.msj = msjCV;
  }
}
