import { Component, Input, OnInit } from '@angular/core';


@Component({
    selector: 'acTrigger',
    templateUrl: './trigger.component.html',
    styleUrls: ['./trigger.component.css']
})
export default class Trigger implements OnInit {
    @Input() type: string;
    @Input() spin: string;
    @Input() style: any;
    @Input() class: string;
    currClasses={};


    ngOnInit() {
        this.currClasses = {
            anticon: true,
            'anticon-spin': !!this.spin || this.type === 'loading',
            [`anticon-${this.type}`]: true,
            [`${this.class}`]:!!this.class
        };

    }
}
