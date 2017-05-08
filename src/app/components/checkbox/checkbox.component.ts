import { Component, Input, OnInit ,Output,EventEmitter} from '@angular/core';


// function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
//     console.log(this)
//     debugger;
//     return class extends constructor {
//         newProperty = "new property";
//         hello = "override";
//     }
// }
// // @classDecorator

// function cs(){
//     console.log(12)
// }


@Component({
    selector: 'acCheck',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss']
})
// @classDecorator
export class CheckBox implements OnInit {
    @Input() disabled: boolean=false;

    @Input() checked: boolean=false;
    @Input() style: any={};
    @Input() class: string;
    currClasses={};

    @Output() checkedChange=new EventEmitter();
    ngOnInit() {
      
        if(typeof this.disabled=='string'){
            this.disabled=true;
        }
        if(typeof this.checked=='string'){
            this.checked=true;
        }

        // this.disabled=typeof this.disabled=='string'?true:false;
        // this.checked=typeof this.checked=='string'?true:false;
        this.update();



    }
    onClick(){
        this.checked=!this.checked;
        this.update();

        this.checkedChange.emit(this.checked)
    }
    ngOnChanges(changes:any){
        this.checked= changes.checked.currentValue;
        this.update();
        // console.log(changes)
    }
    update(){
        
        this.currClasses = {
            [`ant-checkbox`]:true,
            [`ant-checkbox-disabled`]:this.disabled,
            [`ant-checkbox-checked`]:this.checked
        };
    }
}
