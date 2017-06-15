//create time:Tue Jun 13 2017 13:42:10 GMT+0800 (中国标准时间)
import { Component, Input, ChangeDetectorRef, ContentChild, ContentChildren,OnInit, QueryList, ElementRef, Renderer, HostBinding, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NglDatatableColumn } from './column';
import { NglDatatableLoadingOverlay, NglDatatableNoRowsOverlay } from './overlays';

@Component({
  selector: 'acTable[ngl-datatable]',
  templateUrl: './datatable.html',
  host: {

  },
  styles: [`

  `],
})
export class datatable implements OnInit {
  current=1;
  pageSize=10;
  pageChange(event:any){
    this.current=event.current;
    this.pageSize=event.pageSize;
    this._data=this.data.slice((this.current-1)*this.pageSize,this.current*this.pageSize);

  }
  showTotal(total: number, range: number[]) {

    return `${range[0]}-${range[1]} of ${total} items`;
  }

  @Input() data: any[] = [];
  @Input() pagination: any = true;
  @Input() pageSizeData: any[] = [];
  _data: any[] = [];
  ngOnInit() {
    if(this.pagination){
      if(this.pageSizeData.length>0){
        this.pageSize=this.pageSizeData[0]
      }
      this._data=this.data.slice((this.current-1)*this.pageSize,this.current*this.pageSize);
    }else{
      this._data=this.data;
    }
    
    
  }

  @Input() trackByKey: string;

  // @HostBinding('class.slds-table--bordered')
  @Input() bordered = true;

  // @HostBinding('class.slds-table--striped')
  @Input() striped = true;
  @Input() scroll: any = false
  get fixedStyle() {
    return { width: this.scroll.x + 'px' }
  }
  get bodyStyle() {
    return { maxHeight: this.scroll.y + 'px', overflowY: 'scroll', overflowX: 'auto' }
  }

  @Input() sort: INglDatatableSort;
  @Output() sortChange = new EventEmitter<INglDatatableSort>();

  @Input() loading: boolean = false;
  @ContentChild(NglDatatableLoadingOverlay) loadingOverlay: NglDatatableLoadingOverlay;
  @ViewChild('scrollTpl') scrollTpl: ElementRef;
  @ViewChild('scrollHeaderTpl') scrollHeaderTpl: ElementRef;
  @ViewChild('LeftTpl') LeftTpl: ElementRef;
  @ViewChild('RightTpl') RightTpl: ElementRef;


  get showLoading() {
    return this.loading && this.loadingOverlay;
  }
  get innerStyle() {

    return { maxHeight: this.scroll.y + 'px', overflowY: 'scroll' }
  }



  @ContentChild(NglDatatableNoRowsOverlay) noRowsOverlay: NglDatatableNoRowsOverlay;

  get hasRows() {
    return this._data && this._data.length > 0;
  }
  colgroupStyle(col: any) {

    if (col.width == null) {
      return {}
    } else {
      return { width: col.width + 'px', minWidth: col.width + 'px' }
    }

  }


  @ContentChildren(NglDatatableColumn) columns: QueryList<NglDatatableColumn>;

  @Output() onRowClick = new EventEmitter<INglDatatableRowClick>();

  private _columnsSubscription: Subscription;

  constructor(private detector: ChangeDetectorRef, element: ElementRef, renderer: Renderer) {
    // renderer.setElementClass(element.nativeElement, 'slds-table', true);
  }

  columnTrackBy(index: number, column: NglDatatableColumn) {
    return column.key || index;
  }

  dataTrackBy = (index: number, data: any) => {
    return this.trackByKey ? data[this.trackByKey] : index;
  }

  onColumnSort(column: NglDatatableColumn, order: 'asc' | 'desc') {
    const key = column.key;
    if (!key) {
      throw new Error(`ng-lightning: No "key" property is set for sortable column "${column.heading}"`);
    }
    this.sortChange.emit({ key, order });
  }

  getColumnSortOrder(column: NglDatatableColumn) {
    return this.sort && column.key === this.sort.key ? this.sort.order : null;
  }

  rowClick(event: Event, data: any) {
    this.onRowClick.emit({ event, data });
  }

  fixLeft: any[] = [];
  fixRight: any[] = [];
  ngAfterContentInit() {
    this._columnsSubscription = this.columns.changes.subscribe(() => this.detector.markForCheck());

    if (this.scroll) {
      let i = 0;
      this.columns.forEach((x) => {
        if (x.width == null) {
          if (i == 0) {
            i++
          } else {
            x.width = 150;
            console.warn(`表格滚动时,必须总列数减一的列有width属性，否则，除第一个没有width属性的列外，其他默认为150`)
          }

        }
      })
    }

    this.columns.forEach((x) => {
      if (x.fixLeft != null) {
        this.fixLeft.push(x)
      }
      if (x.fixRight != null) {
        this.fixRight.push(x)
      }
    })

  }

  position = 'left'
  currScroll: any = null;
  select(e: any) {
    this.currScroll = e.currentTarget;
  }
  hoverKey: number = -1;
  hover(isHover: boolean, key: number) {
    if (isHover) {
      this.hoverKey = key;
    } else {
      this.hoverKey = -1;
    }

  }

  click() {
    console.log(this.hoverKey)
    debugger;
  }
  ngAfterViewInit() {

    if (this.scrollTpl != null) {
      this.scrollTpl.nativeElement.addEventListener('scroll', (e: any) => {
        if (e.currentTarget != this.currScroll) { return; }

        let left = this.scrollTpl.nativeElement.scrollLeft;
        let top = this.scrollTpl.nativeElement.scrollTop;
        this.scrollHeaderTpl.nativeElement.scrollLeft = left;

        if (this.RightTpl != null) {
          this.RightTpl.nativeElement.scrollTop = top;
        }
        if (this.LeftTpl != null) {
          this.LeftTpl.nativeElement.scrollTop = top;
        }
        if (left == 0) {
          this.position = 'left'
        }
        if (left > 0 && left < this.scrollTpl.nativeElement.scrollWidth - this.scrollTpl.nativeElement.offsetWidth) {
          this.position = 'middle'
        }
        if (left > this.scrollTpl.nativeElement.scrollWidth - this.scrollTpl.nativeElement.offsetWidth) {
          this.position = 'right'
        }
        // console.log(e, top)

      }, false)
      if (this.RightTpl != null) {
        this.RightTpl.nativeElement.addEventListener('scroll', (e: any) => {
          if (e.currentTarget != this.currScroll) { return; }

          let top = this.RightTpl.nativeElement.scrollTop;
          if (this.scrollTpl != null) {
            this.scrollTpl.nativeElement.scrollTop = top;
          }
          if (this.LeftTpl != null) {
            this.LeftTpl.nativeElement.scrollTop = top;
          }

        }, false)
      }
      if (this.LeftTpl != null) {
        this.LeftTpl.nativeElement.addEventListener('scroll', (e: any) => {
          if (e.currentTarget != this.currScroll) { return; }

          let top = this.LeftTpl.nativeElement.scrollTop;

          if (this.scrollTpl != null) {
            this.scrollTpl.nativeElement.scrollTop = top;
          }
          if (this.RightTpl != null) {
            this.RightTpl.nativeElement.scrollTop = top;
          }


        }, false)
      }
    }

  }

  ngOnDestroy() {
    this._columnsSubscription.unsubscribe();
  }


};


export interface INglDatatableSort {
  key: string;
  order: 'asc' | 'desc';
};

export interface INglDatatableRowClick {
  event: Event;
  data: any;
};