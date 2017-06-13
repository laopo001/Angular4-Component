//create time:Tue Jun 13 2017 13:42:10 GMT+0800 (中国标准时间)
import { Component, OnInit, Input, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'acTable',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    @Input() columns:any[] = [];
    @Input() dataSource:any[] = [];

    ngOnInit() {


    }

}
