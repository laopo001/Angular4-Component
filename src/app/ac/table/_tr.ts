import { Component, ChangeDetectionStrategy, Input, HostBinding, OnChanges, HostListener } from '@angular/core';
import { NglDatatableColumn } from './column';

@Component({
    selector: 'tr[table-tr]',
    template:`<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tabletr {
    isHover: boolean = false

    @HostListener('mouseenter')
    onmouseenter() {
        this.isHover = true;
        this.hostClass=`ant-table-row `+this.isHover?'ant-table-row-hover':''
    }

    @HostListener('mouseleave')
    onmouseleave() {
        this.isHover = false;
        this.hostClass=`ant-table-row`;
    }

    @HostBinding('class') hostClass: any = 'ant-table-row';

}