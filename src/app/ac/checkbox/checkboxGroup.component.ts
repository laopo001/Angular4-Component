import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'acCheckGroup',
    template: `<div class="ant-checkbox-group">
        <acCheck></acCheck>
    </div>`,
})
// @classDecorator
export class CheckBox implements OnInit {

    @Input() style: any = {};
    @Input() class: string;
    
    @Input() value: string[];
    @Input() options: string[];
    @Output() onChange=new EventEmitter();
    ngOnInit() {



    }
    onClick() {

    }
    ngOnChanges(changes: any) {


    }
    update() {


    }
}
