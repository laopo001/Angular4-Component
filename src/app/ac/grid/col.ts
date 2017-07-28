import { Component, OnInit, Input,  HostBinding ,ChangeDetectionStrategy} from '@angular/core';
var classnames = require('classnames');


@Component({
    selector: 'div[Col]',
    template: `
        <ng-content></ng-content>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ColComponent implements OnInit {
    @HostBinding('class')
    get Colclass() {
        let res = {
            [`ant-col-${this.span}`]: !!this.span,
            [`ant-col-offset-${this.offset}`]: !!this.offset,
            [`ant-col-push-${this.push}`]: !!this.push,
            [`ant-col-pull-${this.pull}`]: !!this.pull,
            [`ant-col-order-${this.order}`]: !!this.order,

            [`${this.className}`]: !!this.className,
        }
        if (this.xs) {
            if (typeof this.xs !== 'object') {
                this.xs = { span: this.xs }
            }
            res = Object.assign(res, {
                [`ant-col-xs-${this.xs.span}`]: !!this.xs.span,
                [`ant-col-xs-offset-${this.xs.offset}`]: !!this.xs.offset,
                [`ant-col-xs-${this.xs.push}`]: !!this.xs.push,
                [`ant-col-xs-offset-${this.xs.pull}`]: !!this.xs.pull,
                [`ant-col-xs-order-${this.xs.order}`]: !!this.xs.order,
            })
        }
        if (this.sm) {
            if (typeof this.sm !== 'object') {
                this.sm = { span: this.sm }
            }
            res = Object.assign(res, {
                [`ant-col-sm-${this.sm.span}`]: !!this.sm.span,
                [`ant-col-sm-offset-${this.sm.offset}`]: !!this.sm.offset,
                [`ant-col-sm-${this.sm.push}`]: !!this.sm.push,
                [`ant-col-sm-offset-${this.sm.pull}`]: !!this.sm.pull,
                [`ant-col-sm-order-${this.sm.order}`]: !!this.sm.order,
            })
        }

        if (this.md) {
            if (typeof this.md !== 'object') {
                this.md = { span: this.md }
            }
            res = Object.assign(res, {
                [`ant-col-md-${this.md.span}`]: !!this.md.span,
                [`ant-col-md-offset-${this.md.offset}`]: !!this.md.offset,
                [`ant-col-md-${this.md.push}`]: !!this.md.push,
                [`ant-col-md-offset-${this.md.pull}`]: !!this.md.pull,
                [`ant-col-md-order-${this.md.order}`]: !!this.md.order,
            })
        }
        if (this.lg) {
            if (typeof this.lg !== 'object') {
                this.lg = { span: this.lg }
            }
            res = Object.assign(res, {
                [`ant-col-lg-${this.lg.span}`]: !!this.lg.span,
                [`ant-col-lg-offset-${this.lg.offset}`]: !!this.lg.offset,
                [`ant-col-lg-${this.lg.push}`]: !!this.lg.push,
                [`ant-col-lg-offset-${this.lg.pull}`]: !!this.lg.pull,
                [`ant-col-lg-offset-${this.lg.order}`]: !!this.lg.order,
            })
        }
        if (this.xl) {
            if (typeof this.xl !== 'object') {
                this.xl = { span: this.xl }
            }
            res = Object.assign(res, {
                [`ant-col-xl-${this.xl.span}`]: !!this.xl.span,
                [`ant-col-xl-offset-${this.xl.offset}`]: !!this.xl.offset,
                [`ant-col-xl-${this.xl.push}`]: !!this.xl.push,
                [`ant-col-xl-offset-${this.xl.pull}`]: !!this.xl.pull,
                [`ant-col-xl-offset-${this.xl.order}`]: !!this.xl.order,
            })
        }
        return classnames(res);
    }
    @Input() span: number | string = 0;
    @Input() offset: number | string = 0;
    @Input() push: number | string = 0;
    @Input() pull: number | string = 0;
    @Input() order: number | any;

    @Input() xs: number | any;
    @Input() sm: number | any;
    @Input() md: number | any;
    @Input() lg: number | any;
    @Input() xl: number | any;

    @HostBinding('style.padding')
    get ColStyle() {
        if (this.gutter > 0) {
            return `0 ${this.gutter}px`
        } else {
            return ""
        }
    }


    @Input() className: string = ''


    gutter: number | string = 0
    ngOnInit() {

    }
}
