import { Component, Input, OnInit, ElementRef, ViewChild,EventEmitter,Output,ContentChildren,QueryList ,ContentChild} from '@angular/core';
// import KeyCode from 'rc-util/lib/KeyCode';


@Component({
    selector: 'acOption',
    templateUrl: './option.component.html',
})
export default class Option implements OnInit {

    @Input() value: any = '';
    @Input() label: string = '';
    selected=false;
    get Tclass(){

        return 'ant-select-dropdown-menu-item '+(this.selected?'ant-select-dropdown-menu-item-selected':'');
    }
 //   @ContentChild('') l: QueryList<any>;
    ngOnInit() {

    }
    click(){
      
    }
    // ngAfterContentInit() {

    //     console.dir(this.l);
    // }
}
