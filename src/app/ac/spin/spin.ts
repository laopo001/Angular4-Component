

import { Component, ViewChild, TemplateRef, OnInit, ElementRef, Input, ChangeDetectionStrategy } from '@angular/core';

import { contains, stopDefault, stopBubble, waining, toWidth, format, toBoolean } from '../util/util';

type Size = 'small' | 'default' | 'large';
@Component({
    selector: 'Spin',
    // template:` <acIcon type="loading"></acIcon>`,
    templateUrl: `./spin.html`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class SpinComponent implements OnInit {

    @Input() @format(toBoolean) spin = false;
    @Input() size: Size = 'default';
    @Input() tip: string = null;

    get containerClass() {
        return {
            [`ant-spin-container`]: true,
            [`ant-spin-blur`]: this.spin,
        }
    }
    get spinClass() {
        return {
            [`ant-spin`]: true,
            [`ant-spin-spinning`]: this.spin,
            [`ant-spin-show-text`]: !!this.tip,
            [`ant-spin-sm`]: this.size == 'small',
            [`ant-spin-lg`]: this.size == 'large',
        }
    }
    ngOnInit() {

    }
}
