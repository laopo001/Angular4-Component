import { Component, Input, OnInit ,ContentChildren,Directive,QueryList ,Inject, ElementRef,ViewChildren} from '@angular/core';
import {Button} from './button.component'

function classNames(obj: ButtonGroup) {

    var { prefixCls, sizeCls } = obj;

    return {

        [`${prefixCls}-${sizeCls}`]: sizeCls,

         [`${prefixCls}`]: true,
        [`${obj.class}`]:!!obj.class
    }
}




@Component({
    selector: 'ButtonGroup',
    templateUrl: './button-group.component.html',
})
export class ButtonGroup implements OnInit {
    @Input() size: string;
    @Input() class: string;
    // @ViewChildren(Button) child: QueryList<Button>;

    currClasses = {};
    prefixCls= 'ant-btn-group';
    sizeCls='';
    // elRef: ElementRef
    // @ContentChildren(Button) items: QueryList<Button>
    constructor(myElement: ElementRef){
   //     this.elRef=myElement;
    }
    ngOnInit() {
        this.sizeCls = ({
            large: 'lg',
            small: 'sm',
        })[this.size] || '';
        this.currClasses = classNames(this);
        
        // var list=this.elRef.nativeElement.querySelectorAll('acButton');
        // list.forEach((x:any) => {
        //     this.elRef.nativeElement.children[0].appendChild(x.children[0])
        //     this.elRef.nativeElement.children[0].removeChild(x);

        // });



    }
}
