import { Component, ChangeDetectionStrategy, Input, HostBinding, OnChanges, HostListener } from '@angular/core';
import { acTableColumn } from './column';
var classnames = require('classnames');
@Component({
    selector: 'tr[table-tr]',
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tabletr {
    @Input() isHover: boolean = false

    // @HostListener('mouseenter')
    // onmouseenter() {
    //     this.isHover = true;
    //     this.hostClass = 'ant-table-row' + this.isHover ? ' ant-table-row-hover' : ''
    // }

    // @HostListener('mouseleave')
    // onmouseleave() {
    //     this.isHover = false;
    //     this.hostClass = `ant-table-row`;
    // }

    @HostBinding('class')
    get hostClass() {
        console.log(this.isHover)
        return classnames({
            ['ant-table-row']: true,
            [`ant-table-row-hover`]: this.isHover,
        })
    }

}