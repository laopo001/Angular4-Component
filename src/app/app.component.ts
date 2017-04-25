import { Component,ViewChild ,TemplateRef,OnInit,ElementRef} from '@angular/core';

import '../assets/css/styles.css';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('cs') cs: TemplateRef<any>;

  constructor(private elRef:ElementRef){
   
  }
  myClick(e:any){
    console.log(e)
  }
  showTotal(total:number, range:number[]){

    return `${range[0]}-${range[1]} of ${total} items`;
  }
  onChange(q:any ){
    console.log(q)
  }
  ngOnInit(){
    console.log('ngOnInit',this.cs);
    console.log('ngOnInit',this.elRef);
  }
    ngAfterContentInit() {
     console.log('ngAfterContentInit',this.cs);

    }
 }
