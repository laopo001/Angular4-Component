//create time:Tue Jun 13 2017 13:42:10 GMT+0800 (中国标准时间)
import { Component, Input, ChangeDetectorRef, ContentChild, SimpleChanges, ContentChildren, OnInit, OnChanges, QueryList, ElementRef, Renderer, HostBinding, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NglDatatableColumn } from './column';
import { NglDatatableLoadingOverlay, NglDatatableNoRowsOverlay } from './overlays';
type Size = 'large' | 'small' | 'middle';
@Component({
  selector: 'acTable[ngl-datatable]',
  templateUrl: './datatable.html',
  host: {

  },
  styles: [`

  `],
})
export class datatable implements OnChanges {
  @Input() size: Size = 'large'
  get tableSizeClass() {
    switch (this.size) {
      case 'large': return 'ant-table-large';
      case 'middle': return 'ant-table-middle';
      case 'small': return 'ant-table-small';
      default: return 'ant-table';
    }
  }
  get PaginationSize() {
    switch (this.size) {
      case 'large': return 'default';
      case 'middle': return 'small';
      case 'small': return 'small';
      default: return 'default';
    }
  }
  current = 1;
  pageSize = 10;
  pageChange(event: any) {
    this.current = event.current;
    this.pageSize = event.pageSize;
    this._data = this.data.slice((this.current - 1) * this.pageSize, this.current * this.pageSize);

  }
  showTotal(total: number, range: number[]) {

    return `${range[0]}-${range[1]} of ${total} items`;
  }

  @Input() data: any[] = [];
  @Input() pagination: any = {
    pageSizeData: [],
    size: 'default',
    showQuickJumper: false
  };
  @Input() pageSizeData: any[] = [];
  _data: any[] = [];
  Init() {
    this.data = this.data == null ? [] : this.data;
    if (this.pagination) {
      this.pagination.pageSizeData = this.pageSizeData;

      if (this.pagination.pageSizeData.length > 0) {
        this.pageSize = this.pagination.pageSizeData[0]
      }
      this._data = this.data.slice((this.current - 1) * this.pageSize, this.current * this.pageSize);
    } else {
      this._data = this.data;
    }

  }

  ngOnChanges(changes: SimpleChanges) {
    if ('data' in changes) {
      this.current = 1;
    }
    this.Init();
  }

  @Input() trackByKey: string;

  // @HostBinding('class.slds-table--bordered')
  @Input() bordered = false;

  // @HostBinding('class.slds-table--striped')
  @Input() striped = true;
  @Input() scroll: any = false
  get fixedStyle() {
    if (this.scroll.x == null) {
      return {}
    } else {
      return { width: this.scroll.x + 'px' }
    }

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

    if (this.scroll.x) {
      let i = 0;
      let maxWidth = 0;
      this.columns.forEach((x) => {
        if (x.width == null) {
          if (i == 0) {
            i++
          } else {
            x.width = 150;
            maxWidth += x.width as number;
            console.warn(`表格滚动时,必须总列数减一的列有width属性，否则，除第一个没有width属性的列外，其他默认为150`)
          }

        } else {
          maxWidth += x.width as number;
        }
      })

      if (this.scroll.x < maxWidth) {
        if (i == 0) {
          this.scroll.x = maxWidth;
        } else {
          this.scroll.x = maxWidth + 150;
        }
      }
      if (this.scroll.x > maxWidth) {
        if (i == 0) {
          this.scroll.x = maxWidth;
        } 
      }
    }

    this.columns.forEach((x) => {

      if (x.fixLeft != null) {
        this.fixLeft.push(x)
      }
      if (x.fixRight != null) {
        this.fixRight.push(x)
      }
    })
    if (this.fixLeft.length > 0 || this.fixRight.length > 0) {
      if (this.scroll.x == null) {
        console.warn('fixLeft和fixRight固定列，必须定义scroll.x')
        this.fixLeft = [];
        this.fixRight = [];
      }
    }

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

  ngAfterViewInit() {

    if (this.scrollTpl != null) {
      this.scrollTpl.nativeElement.addEventListener('scroll', (e: any) => {

        let left = this.scrollTpl.nativeElement.scrollLeft;
        if (this.scrollHeaderTpl != null) {
          this.scrollHeaderTpl.nativeElement.scrollLeft = left;
        }
        if (left == 0) {
          this.position = 'left'
        }
        if (left > 0 && left < this.scrollTpl.nativeElement.scrollWidth - this.scrollTpl.nativeElement.offsetWidth) {
          this.position = 'middle'
        }
        if (left >= this.scrollTpl.nativeElement.scrollWidth - this.scrollTpl.nativeElement.offsetWidth && left > 0) {
          this.position = 'right'
        }
        //console.log(left, this.scrollTpl.nativeElement.scrollWidth - this.scrollTpl.nativeElement.offsetWidth)

        if (e.currentTarget != this.currScroll) { return; }


        let top = this.scrollTpl.nativeElement.scrollTop;


        if (this.RightTpl != null) {
          this.RightTpl.nativeElement.scrollTop = top;
        }
        if (this.LeftTpl != null) {
          this.LeftTpl.nativeElement.scrollTop = top;
        }


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