import { Component, Input, OnInit, ContentChildren, Directive, QueryList, Inject, ElementRef, ViewChildren } from '@angular/core';
import { Button } from './button.component'

@Component({
    selector: 'ButtonGroup',
    templateUrl: './button-group.component.html',
})
export class ButtonGroup implements OnInit {
    @Input() size: string;
    @Input() className: string;
    // @ViewChildren(Button) child: QueryList<Button>;
    get currClasses() {
        let sizeCls = ({
            large: 'lg',
            small: 'sm',
        })[this.size] || '';
        var { prefixCls } = this;
        return {
            [`${prefixCls}-${sizeCls}`]: sizeCls,
            [`${prefixCls}`]: true,
            [`${this.className}`]: !!this.className
        }
    }
    prefixCls = 'ant-btn-group';

    constructor(myElement: ElementRef) {

    }
    ngOnInit() {

    }
}
