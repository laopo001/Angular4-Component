import { Component } from '@angular/core';
import '../assets/css/styles.css';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myClick(e:any){
    console.log(e)
  }
  showTotal(total:number, range:number[]){

    return `${range[0]}-${range[1]} of ${total} items`;
  }
 }
