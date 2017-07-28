
import { Component, OnInit, Input, ContentChildren, QueryList, HostBinding, ChangeDetectionStrategy } from '@angular/core';

import ColComponent from './col';
var classnames = require('classnames');

@Component({
    selector: 'div[Row]',
    template: `
         <ng-content></ng-content>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class RowComponent implements OnInit {
    @HostBinding('class')
    get Rowclass() {
        return classnames({
            [`ant-row`]: !this.type,
            [`ant-row-${this.type}`]: !!this.type,
            [`ant-row-${this.type}-${this.justify}`]: this.type && this.justify,
            [`ant-row-${this.type}-${this.align}`]: this.type && this.align,
            [`${this.className}`]: !!this.className
        })
    }
    @HostBinding('style.margin')
    get RowStyle() {
        if (this.gutter > 0) {
            return `0 ${this.gutter as number * -1}px`
        } else {
            return ""
        }
    }

    @Input() className: string = ''
    @Input() gutter: number | string = 0

    @Input() type: string;
    @Input() justify: string;
    @Input() align: string;

    @ContentChildren(ColComponent) cols: QueryList<ColComponent>;


    ngOnInit() {

    }
    ngAfterContentInit() {
        this.cols.map(x => { x.gutter = this.gutter; return x; })
    }
}
