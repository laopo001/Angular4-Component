import { Component, Input, OnInit ,Output,EventEmitter} from '@angular/core';



@Component({
    selector: 'Check',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss']
})
export class CheckBox implements OnInit {
    @Input() disabled: boolean=false;

    @Input() defaultChecked: boolean=false;
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
        if(typeof this.defaultChecked=='string'){
            this.defaultChecked=true;
        }
        
        this.render();

    }
    onClick(){
        this.checked=!this.checked;
   //     this.update();

        this.checkedChange.emit(this.checked)
    }
    ngOnChanges(changes:any){

        for(var key in changes){
            this[key]=changes[key].currentValue;
        }
        this.render();
    }
    render(){
        
        this.currClasses = {
            [`ant-checkbox`]:true,
            [`ant-checkbox-disabled`]:this.disabled,
            [`ant-checkbox-checked`]:this.checked
        };
    }
}
