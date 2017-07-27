import { Component, Input, OnInit, HostBinding,Output ,HostListener , EventEmitter} from '@angular/core';
import { toBoolean, format } from '../util/util'
var classnames = require('classnames');
@Component({
    selector: 'span[expandedRow]',
    template: `<ng-content></ng-content>`
})
export class expandedRowIcon implements OnInit {
    @Input() @format(toBoolean) open: boolean = false;
    @Output() openChange = new EventEmitter();

    @HostBinding('class')
    get Tclass() {
        return classnames({
            [`ant-table-row-expand-icon`]: true,
            [`ant-table-row-expanded`]: !!this.open,
            [`ant-table-row-collapsed`]: !this.open,
        })
    }
    @HostListener('click', ['$event']) handleClick(e: any) {
        this.open = !this.open;
        this.openChange.emit(this.open)
    }
    ngOnInit() {
    }

}
