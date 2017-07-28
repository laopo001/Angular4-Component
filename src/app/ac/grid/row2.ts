
import { Component, OnInit, Input ,ContentChildren ,QueryList,ChangeDetectionStrategy} from '@angular/core';

import ColComponent  from './col2';


@Component({
    selector: 'Row',
    template: `
    <div [ngClass]="Rowclass" [ngStyle]="RowStyle">
         <ng-content></ng-content>
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class RowComponent implements OnInit {
    get Rowclass() {
        return {
            [`ant-row`]: !this.type,
            [`ant-row-${this.type}`]: !!this.type,
            [`ant-row-${this.type}-${this.justify}`]:this.type&&this.justify,
            [`ant-row-${this.type}-${this.align}`]:this.type&&this.align,
            [`${this.className}`]: !!this.className
        }
    }
    get RowStyle() {
        if (this.gutter > 0) {
            return {
                [`margin-left`]: (this.gutter as number * -1) + 'px',
                [`margin-right`]: (this.gutter as number * -1) + 'px',
            }
        } else {
            return {}
        }
    }
    @Input() className: string = ''
    @Input() gutter: number | string = 0

    @Input() type:string;
    @Input() justify:string;
    @Input() align:string;

    @ContentChildren(ColComponent) cols: QueryList<ColComponent>;


    ngOnInit() {

    }
    ngAfterContentInit(){
        this.cols.map(x=>{x.gutter=this.gutter;return x;})
    }  
}
