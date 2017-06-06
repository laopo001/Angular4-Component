import { Component, Input, OnInit, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';

var classnames = require('classnames');

function classNames(obj: Button) {

    var { prefixCls, type, shape, iconOnly, sizeCls, icon, loading, clicked, ghost } = obj;

    return classnames({
        [`${prefixCls}`]: true,
        [`${prefixCls}-${type}`]: !!type,
        [`${prefixCls}-${shape}`]: !!shape,
        [`${prefixCls}-${sizeCls}`]: !!sizeCls,
        [`${prefixCls}-icon-only`]: iconOnly,
        [`${prefixCls}-loading`]: loading,
        [`${prefixCls}-clicked`]: clicked,
        [`${prefixCls}-background-ghost`]: ghost,

        [`${obj.class}`]: !!obj.class
    })
}

@Component({
    selector: 'Button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.css']
})
export class Button implements OnInit {
    @HostBinding('style.display') dis = 'inline-block';
    @Input() loading: boolean = false;
    clicked: boolean = false;
    @Input() ghost: boolean = false;
    @Input() iconOnly: boolean = false;
    @Input() shape: string;
    @Input() size: string;
    @Input() icon: string;
    @Input() type: string;
    @Input() htmlType: string = 'button';
    @Input() class: string;
    @Input() style: any;
    currClasses = {};
    prefixCls = 'ant-btn';
    sizeCls = '';
    iconType = "";
    timeout = 0;
    @HostBinding('class') Tclass: any = '';
    @HostBinding('type') Ttype: any = '';

    @Output() onClick = new EventEmitter();
    constructor() {

    }

    ngOnInit() {
        if (typeof this.ghost == 'string') {
            this.ghost = true;
        }
        if (typeof this.loading == 'string') {
            this.loading = true;
        }
        this.sizeCls = ({
            large: 'lg',
            small: 'sm',
        })[this.size] || '';
        //  this.currClasses = classNames(this);
        this.Tclass = classNames(this);
        this.Ttype = this.htmlType;

        this.iconType = this.loading ? 'loading' : this.icon;

    }


    @HostListener('click', ['$event']) handleClick(e: any) {
        this.clicked = true;
        this.Tclass = classNames(this);
        clearTimeout(this.timeout);
        this.timeout = Number(setTimeout(() => {
            this.clicked = false;
            this.Tclass = classNames(this);
        }, 500));

        this.onClick.emit(e);
    }
}
