import { Component, ViewChild, TemplateRef, OnInit, ElementRef } from '@angular/core';
import {message} from './ac/'
import '../assets/css/styles.css';


@Component({
  selector: 'my-app',
 // template:` <acIcon type="loading"></acIcon>`,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('cs') cs: TemplateRef<any>;
  qq = true;
  constructor(private elRef: ElementRef) {

  }
  myClick(e: any) {

    console.log(e)
  }
  showTotal(total: number, range: number[]) {

    return `${range[0]}-${range[1]} of ${total} items`;
  }
  onChange(q: any) {
    console.log(q)
  }
  ngOnInit() {
    console.log('ngOnInit', this.cs);
    console.log('ngOnInit', this.elRef);
  }
  ngAfterContentInit() {
    console.log('ngAfterContentInit', this.cs);

  }
  layout(key:any) {

    let close = message[key]('qwoerqrej', 1500)
    setTimeout(() => {
      //  close();
    }, 1000)
  }
  selectValue='1';
  selectChange(x:any){
    console.log(x)
    this.selectValue='1';
  }
}
