import { Component, ViewChild, TemplateRef, OnInit, ElementRef } from '@angular/core';
import {message} from '../../ac/'



@Component({
  selector: 'my-app',
 // template:` <acIcon type="loading"></acIcon>`,
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export default class AppComponent implements OnInit {
  list=[{label:'A',value:0},{label:'B',value:1},{label:'C',value:2}]
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
    this.selectValue=x;
  }
  pageSizeData=[10,20,30,40,50,60];
  current=1;
  pageSize=10;

  pageSizeChange(x:any){

    this.pageSize=x;
  }

  queding(){

    console.log(
      this.current,this.pageSize
    )
  }
}
