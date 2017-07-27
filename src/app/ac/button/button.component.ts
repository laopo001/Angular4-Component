import { Component, Input, OnInit, Output, EventEmitter, HostBinding, HostListener, ElementRef, Renderer ,ChangeDetectionStrategy} from '@angular/core';

var classnames = require('classnames');
import { toBoolean, format } from '../util/util'
@Component({
    selector: 'Button',
    templateUrl: './button.component.html',
//    styleUrls: ['./button.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Button implements OnInit {
    @Input() @format(toBoolean) loading: boolean = false;

    @Input() @format(toBoolean) ghost: boolean = false;
    @Input() @format(toBoolean) disabled: string | boolean = false;


    @Input() iconOnly: boolean = false;
    @Input() shape: string;
    @Input() size: string;
    @Input() icon: string;
    @Input() type: string;
    @Input() htmlType: string = 'button';
    @Input() className: string;
    @Input() style: any;

    prefixCls = 'ant-btn';
    get sizeCls() {
        return ({
            large: 'lg',
            small: 'sm',
        })[this.size] || '';
    }
    get iconType() {
        return this.loading ? 'loading' : this.icon;
    }
    timeout = null;
    clicked: boolean = false;
    @HostBinding('class')
    get Tclass() {
        var { prefixCls, type, shape, iconOnly, sizeCls, icon, loading, clicked, ghost } = this;
        return classnames({
            [`${prefixCls}`]: true,
            [`${prefixCls}-${type}`]: !!type,
            [`${prefixCls}-${shape}`]: !!shape,
            [`${prefixCls}-${sizeCls}`]: !!sizeCls,
            [`${prefixCls}-icon-only`]: iconOnly,
            [`${prefixCls}-loading`]: loading,
            [`${prefixCls}-clicked`]: clicked,
            [`${prefixCls}-background-ghost`]: ghost,

            [`${this.className}`]: !!this.className
        })

    }
    @HostBinding('type')
    get Ttype() {
        return this.htmlType;;
    }
    // $_disabled=false
    // @Input('disabled') 
    // set disabled(x:any){this.$_disabled=x};
    // get disabled(){return this.$_disabled}

    @HostBinding('attr.disabled')
    get Host_disabled() {
        return this.disabled ? 'disabled' : null;
    }



    @Output() onClick = new EventEmitter();
    constructor(private element: ElementRef, private renderer: Renderer) {

    }
    ngOnInit() {

    }
    ngOnChanges(changes: any) {
        //  this.renderer.setElementAttribute(this.element.nativeElement, 'disabled', this.disabled ? 'disabled' : null)
    }

    @HostListener('click', ['$event']) handleClick(e: any) {

        if (this.timeout != null) {
            return;
        }
        this.clicked = true;
        this.timeout = Number(setTimeout(() => {
            this.clicked = false;
            this.timeout = null;
        }, 200));

        this.onClick.emit(e);
    }
}
