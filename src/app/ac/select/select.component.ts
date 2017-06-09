import { Component, Input, OnInit, ElementRef, ViewChild, Output, EventEmitter, ContentChildren, QueryList, ViewChildren } from '@angular/core';
// import KeyCode from 'rc-util/lib/KeyCode';


import Option from './option.component';



@Component({
    selector: 'acSelect',
    templateUrl: './select.component.html',
})
export default class Select implements OnInit {
    @Input() placeholder: string = '';
    @Output() onChange = new EventEmitter();
    @Output() valueChange = new EventEmitter();
    @ContentChildren(Option)
    childCmps: QueryList<Output>;
    
    @Input() value: any = '';
    selectLabel = ""

    open = false
    Template = {
        contentClass: {

        }
    }
    ngOnInit() {

    }
    showChange(e: boolean) {
        this.open = e;
    }
    ngAfterContentInit() {

        if (this.childCmps == null) return;
        this.childCmps.map((x: any) => {
            if (x.value == this.value) {
                x.selected = true;
                this.value = x.value;
                this.selectLabel = x.label;
            } else {
                x.selected = false;
            }
            x.click = () => {

                this.onChange.emit(x.value);
                this.valueChange.emit(x.value);
            }
            return x;
        })

    }

    ngOnChanges(changes: any) {

        for (var key in changes) {
            this[key] = changes[key].currentValue;
        }
        this.ngAfterContentInit()
    }
}
