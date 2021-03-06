//create time:Tue Jun 13 2017 13:42:10 GMT+0800 (中国标准时间)
import {
  Component, Input, ChangeDetectorRef, ContentChild, SimpleChanges, ContentChildren, OnInit, NgZone,
  OnChanges, QueryList, TemplateRef, ElementRef, Renderer, HostBinding, Output, EventEmitter, ViewChild, ChangeDetectionStrategy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { acTableColumn } from './column';
import { LoadingOverlay, NoData, ExpandedRow } from './overlays';
import * as clonedeep from 'lodash.clonedeep'
import { waining, measureScrollbar } from '../util/util'
type Size = 'large' | 'small' | 'middle';
@Component({
  selector: 'acTable',
  templateUrl: './datatable.html',
  styleUrls: [`datatable.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class datatable implements OnChanges {
  @Input() header: string | TemplateRef<any>;
  @Input() rowClassName: any;
  getRowClass(row, index) {
    let res = { [`ant-table-row`]: true }
    if (this.hoverKey === index) {
      res[`ant-table-row-hover`] = true;
    }
    if (typeof this.rowClassName === 'function') {
      res = Object.assign(res, this.rowClassName(row, index))
    }
    return res;
  }

  @Input() footer: string | TemplateRef<any>;
  @Input() rowSelection: any;
  Allchecked = false;
  indeterminate = false;
  selects = [];

  get fixedStyle() {
    if (this.scroll && this.scroll.x) {
      return { width: this.scroll.x + 'px' }
    } else {
      return {}
    }
  }

  scrollbarWidth = measureScrollbar();
  get scrollbarWidthStyle() {
    if (this.scrollbarWidth > 0 && this.scroll.y != null) {
      return {
        [`margin-bottom`]: `-${this.scrollbarWidth}px`,
        [`padding-bottom`]: `0px`
      }
    } else {
      return {}
    }

  }
  cellCheckedChange(e, row) {
    if (this.rowSelection && this.rowSelection.type == 'radio') {
      if (e) {
        this.selects = [];
        this.selects.push(row);
        row.__checked__ = true;
        this.data.map((x) => {
          if (x[this.rowKey] != row[this.rowKey]) {
            x.__checked__ = false;
          }
        })
      } else {
        this.selects = [];
      }

    }
    if (this.rowSelection && this.rowSelection.type == 'checkbox') {
      if (e) {
        this.selects.push(row);
      } else {
        this.selects = this.selects.filter((x) => {
          if (x[this.rowKey] == row[this.rowKey]) { return false } else { return true };
        })
      }
    }
    this.rowSelection.onChange(this.selects)
    this.isCheckedAll();
  }
  isCheckedAll() {
    this._data = this._data.map((x) => {
      let index = this.selects.findIndex((y) => { return x[this.rowKey] === y[this.rowKey] })
      if (index > -1) {
        x.__checked__ = true;
      } else {
        x.__checked__ = false;
      }
      return x;
    })
    let temp = this._data.filter(x => x.__checked__);
    if (temp.length === this._data.length) {
      this.Allchecked = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
      this.Allchecked = false;
    }
    if (temp.length == 0) {
      this.indeterminate = false;
      this.Allchecked = false;
    }
    // this.cdRef.markForCheck();
  }
  headCheckedChange(e) {
    if (this.indeterminate === true || this.Allchecked === true) {
      this.selects = this.selects.filter((x) => {
        let index = this._data.findIndex((y) => { return x[this.rowKey] === y[this.rowKey] })
        if (this._data[index].__disabled__) { return true; }
        if (index > -1) {
          return false;
        } else {
          return true
        }
      })
    } else {

      if (this.rowSelection && this.rowSelection.type == 'checkbox') {
        if (e) {
          this.selects = this.selects.concat(this._data.filter(x => !x.__disabled__));
        } else {
          console.error('error')
        }
      }
    }

    this.rowSelection.onChange(this.selects);
    this.isCheckedAll()
  }
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
    this.isCheckedAll();
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
  @Input()
  set pageSizeData(x: any) {
    if (typeof this.pagination == 'object') {
      this.pagination.pageSizeData = x;
    }

  }
  _data: any[] = [];

  ngOnChanges(changes: SimpleChanges) {

    this.data = this.data == null ? [] : this.data;
    if ('data' in changes) {
      if (this.pagination) {
        this.current = 1;
        if (this.pagination.pageSizeData.length > 0) {
          this.pageSize = this.pagination.pageSizeData[0]
        }
        this._data = this.data.slice((this.current - 1) * this.pageSize, this.current * this.pageSize);
      } else {
        this._data = this.data;
      }
    }
    if ('rowSelection' in changes) {
      if (this.rowSelection && this.rowSelection.selectedRows != null) {
        this.selects = this.rowSelection.selectedRows;
      }
    }
    this.isCheckedAll();
  }

  @Input() rowKey: string;
  @Input() bordered = false;
  @Input() striped = true;
  @Input() scroll: any = false

  get bodyStyle() {
    if (this.scroll.y == null) {
      return { overflowX: 'auto' }
    } else {
      return { overflowX: 'auto', maxHeight: this.scroll.y + 'px', overflowY: 'scroll', }
    }

  }

  @Input() sort: INglDatatableSort = { key: '', order: 'asc' };
  @Output() sortChange = new EventEmitter<INglDatatableSort>();

  @Input() loading: boolean = false;
  @ContentChild(LoadingOverlay) loadingOverlay: LoadingOverlay;
  @ViewChild('scrollTpl') scrollTpl: ElementRef;
  @ViewChild('scrollHeaderTpl') scrollHeaderTpl: ElementRef;
  @ViewChild('LeftTpl') LeftTpl: ElementRef;
  @ViewChild('RightTpl') RightTpl: ElementRef;


  get showLoading() {
    return this.loading && this.loadingOverlay;
  }
  get innerStyle() {
    if (this.scroll.y == null) {
      return {}
    } else {
      return { maxHeight: this.scroll.y + 'px', overflowY: 'scroll' }
    }

  }


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

  @ContentChild(NoData) noRowsOverlay: NoData;
  @ContentChild(ExpandedRow) expandedRow: ExpandedRow;
  @ContentChildren(ExpandedRow) ExpandedRows: QueryList<ExpandedRow>;
  private _ExpandedRowsSubscription: Subscription;
  @ContentChildren(acTableColumn) columns: QueryList<acTableColumn>;
  private _columnsSubscription: Subscription;
  // @Output() onRowClick = new EventEmitter<INglDatatableRowClick>();


  constructor(private cdRef: ChangeDetectorRef, element: ElementRef, private renderer: Renderer, private ngZone: NgZone, ) {


  }

  columnTrackBy(index: number, column: acTableColumn) {
    return column.key || index;
  }

  dataTrackBy = (index: number, data: any) => {
    return this.rowKey ? data[this.rowKey] : index;
  }

  onColumnSort(column: acTableColumn, order: 'asc' | 'desc') {
    const key = column.key;
    if (!key) {
      throw new Error(`ng-lightning: No "key" property is set for sortable column "${column.heading}"`);
    }
    this.sortChange.emit({ key, order });
  }

  getColumnSortOrder(column: acTableColumn) {
    return this.sort && column.key === this.sort.key ? this.sort.order : null;
  }

  // rowClick(event: Event, data: any) {
  //   this.onRowClick.emit({ event, data });
  // }
  get otherLength() {
    let res = 0;
    if (this.rowSelection) {
      res += 1;
    }
    if (this.expandedRow) {
      res += 1
    }
    return res;
  }
  fixLeft: any[] = [];
  fixRight: any[] = [];

  ngAfterContentInit() {
    this._columnsSubscription = this.columns.changes.subscribe(() => this.cdRef.markForCheck());
    this._ExpandedRowsSubscription=this.ExpandedRows.changes.subscribe(() => this.cdRef.markForCheck());
    if (this.scroll.x) {
      let i = 0;
      let maxWidth = 0;
      let tempColumn: acTableColumn;
      this.columns.forEach((x, index) => {
        if (x.width == null) {
          if (i == 0) {
            i++
            tempColumn = x;
          } else {
            i++;
            x.width = 100;
            maxWidth += x.width as number;
            console.warn(`表格滚动时,必须总列数减一的列有width属性，否则，除第一个没有width属性的列外，其他默认为100`)
          }
        } else {
          maxWidth += x.width as number;
        }
      })

      if (this.scroll.x < maxWidth) {
        if (i == 0) {
          this.scroll.x = maxWidth;
        }
        console.warn(`scroll.x必须大于width之和`)

      }
      if (this.scroll.x > maxWidth) {
        if (i == 0) {
          this.scroll.x = maxWidth;
        }
        if (i > 0) {

          tempColumn.width = this.scroll.x - maxWidth

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

  hoverKey: number = -1;
  hover(isHover: boolean, key: number) {

    if (isHover) {
      this.hoverKey = key;
    } else {
      this.hoverKey = -1;
    }

  }
  ngOnInit() {
    waining(this.rowKey == null, 'rowKey是必须的。')

  }
  lastScrollLeft = 0;
  currScroll: any = null;
  select(e: any, b) {
    if (b) { return; }
    this.currScroll = e.currentTarget;
  }
  ngAfterViewInit() {

    if (this.scrollTpl != null) {
      this.ngZone.runOutsideAngular(() => {

        this.renderer.listen(this.scrollHeaderTpl.nativeElement, 'scroll', (e) => {
          if (e.currentTarget != this.currScroll) { return; }
          let left = this.scrollHeaderTpl.nativeElement.scrollLeft;
          if (this.lastScrollLeft != left) {
            this.ngZone.run(() => {
              if (left == 0) {
                this.position = 'left'
              }
              if (left > 0 && left < this.scrollHeaderTpl.nativeElement.scrollWidth - this.scrollHeaderTpl.nativeElement.offsetWidth) {
                this.position = 'middle'
              }
              if (left >= this.scrollHeaderTpl.nativeElement.scrollWidth - this.scrollHeaderTpl.nativeElement.offsetWidth && left > 0) {
                this.position = 'right'
              }
            })
            this.scrollTpl.nativeElement.scrollLeft = left;
          }
          this.lastScrollLeft = left;
        })
        // this.renderer.setElementStyle(this.scrollTpl.nativeElement, 'overflow', 'hidden')
        // this.renderer.listen(this.scrollTpl.nativeElement,'scroll', (e: any) => {
        this.renderer.listen(this.scrollTpl.nativeElement, 'scroll', (e: any) => {

          let left = this.scrollTpl.nativeElement.scrollLeft;

          if (this.lastScrollLeft != left) {
            this.ngZone.run(() => {
              if (left == 0&&this.position!='left') {
                this.position = 'left'
                this.cdRef.markForCheck();
              }
              if (left > 0 && left < this.scrollTpl.nativeElement.scrollWidth - this.scrollTpl.nativeElement.offsetWidth&&this.position!='middle') {
                this.position = 'middle'
                this.cdRef.markForCheck();
              }
              if (left >= this.scrollTpl.nativeElement.scrollWidth - this.scrollTpl.nativeElement.offsetWidth && left > 0&&this.position!='right') {
                this.position = 'right'
                this.cdRef.markForCheck();
              }
              
            })

            this.scrollHeaderTpl.nativeElement.scrollLeft = left;

          }
          this.lastScrollLeft = left;

          if (e.currentTarget != this.currScroll) { return; }

          let top = this.scrollTpl.nativeElement.scrollTop;

          if (this.RightTpl != null) {
            this.RightTpl.nativeElement.scrollTop = top;
          }
          if (this.LeftTpl != null) {
            this.LeftTpl.nativeElement.scrollTop = top;
          }


        })
        if (this.RightTpl != null) {
          this.renderer.listen(this.RightTpl.nativeElement, 'scroll', (e: any) => {

            if (e.currentTarget != this.currScroll) { return; }
            let top = this.RightTpl.nativeElement.scrollTop;

            if (this.scrollTpl != null) {
              this.scrollTpl.nativeElement.scrollTop = top;
            }
            if (this.LeftTpl != null) {
              this.LeftTpl.nativeElement.scrollTop = top;
            }
          })

        }
        if (this.LeftTpl != null) {

          this.renderer.listen(this.LeftTpl.nativeElement, 'scroll', (e: any) => {
            if (e.currentTarget != this.currScroll) { return; }

            let top = this.LeftTpl.nativeElement.scrollTop;

            if (this.scrollTpl != null) {
              this.scrollTpl.nativeElement.scrollTop = top;
            }
            if (this.RightTpl != null) {
              this.RightTpl.nativeElement.scrollTop = top;
            }


          })
        }
      })
    }

  }

  ngOnDestroy() {
    this._columnsSubscription.unsubscribe();
    this._ExpandedRowsSubscription.unsubscribe()
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