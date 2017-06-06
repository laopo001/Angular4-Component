import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import LOCALE from './locale/zh_CN';

function classNames(obj: Pagination) {

    var { prefixCls, isSmall } = obj;

    return {
        'mini': isSmall,
        [`${prefixCls}`]:true,
        [`${obj.class}`]: !!obj.class
    }
}
function noop() {
}




@Component({
    selector: 'acPagination',
    templateUrl: './pagination.component.html',

})
export class Pagination implements OnInit {

    @Input() size: string;
    isSmall: boolean;

    
    @Input() total = 0;
    @Input() defaultPageSize = 10;
    // @Input() onChange = noop;


    @Input() selectComponentClass: any = null;
    @Input() showQuickJumper = false;
    @Input() showSizeChanger = false;
    @Input() showLessItems = false;
    @Input() showTitle = true;
    @Input() onShowSizeChange = noop;
    @Input() locale = LOCALE;
    @Input() showTotal: any;

    @Input() defaultCurrent = 1;
    @Input() current: number;
    _currentTemp = 1;
    _current:number = 1;
    pageSize = 10;

    pagerList: any[] = [];

    @Input() simple: boolean = false;



    @Input() class: string;
    @Input() style: any;
    @Output() onChange = new EventEmitter();

    currClasses = {};

    prefixCls = 'ant-pagination';
    selectPrefixCls = 'ant-select';
    showTotalClass = {};
    showTotalText = "";
    _prevClass = {};
    _nextClass = {}
    simpleUlClass = "";
    simpleShowTitle = ""
    simpleMiddleClass = ""
    simpleSlashClass = ""
    allPages = 0;
    constructor() {

    }

    ngOnInit() {
        this._current=this.defaultCurrent==null?this._current:this.defaultCurrent;
        this._currentTemp=this.defaultCurrent==null?this._current:this.defaultCurrent;
        this.render();
    }
    render(){
        this._current=this.current==null?this._current:this.current;
        this._currentTemp=this.current==null?this._current:this.current;
        this.allPages = this._calcPage();
        this.isSmall = this.size === 'small';
        
        
        this.currClasses = classNames(this);
        this.showTotalClass = { [`${this.prefixCls}-total-text`]: true };
        this.showTotalText = this.showTotal(
            this.total,
            [
                (this._current - 1) * this.pageSize + 1,
                this._current * this.pageSize > this.total ? this.total : this._current * this.pageSize,
            ]
        )
        if (this.simple) {
            this.simpleUlClass = `${this.prefixCls} ${this.prefixCls}-simple ${this.class}`;
            this.simpleShowTitle = this.showTitle ? `${this._current}/${this.allPages}` : null
            this.simpleMiddleClass = `${this.prefixCls}-simple-pager`;
            this.simpleSlashClass = `${this.prefixCls}-slash`
        }

        this._prevClass = { [`${this._hasPrev() ? '' : `${this.prefixCls}-disabled`}`]: true, [`${this.prefixCls}-prev`]: true };
        this._nextClass = { [`${this._hasNext() ? '' : `${this.prefixCls}-disabled`}`]: true, [`${this.prefixCls}-next`]: true };
        const allPages = this._calcPage();


        let jumpPrev = null;
        let jumpNext = null;
        let firstPager = null;
        let lastPager = null;
        const pageBufferSize = this.showLessItems ? 1 : 2;
        const {  pageSize, pagerList } = this;

        if (allPages <= 5 + pageBufferSize * 2) {
            for (let i = 1; i <= allPages; i++) {
                const active = this._current === i;
                const prefixCls = `${this.prefixCls}-item`;
                let className = `${prefixCls} ${prefixCls}-${i}`;
                if (active) {
                    className = `${className} ${prefixCls}-active`;
                }
                pagerList.push({
                    locale: this.locale,
                    onClick: () => { this._handleChange.bind(this, i) },
                    key: i,
                    page: i,
                    className: className,
                    showTitle: this.showTitle,
                })
            }
        } else {
            const prevItemTitle = this.showLessItems ? this.locale.prev_3 : this.locale.prev_5;
            const nextItemTitle = this.showLessItems ? this.locale.next_3 : this.locale.next_5;
            const prefixCls = `${this.prefixCls}-item`;
            jumpPrev = {
                showTitle: this.showTitle ? prevItemTitle : null,
                key: "prev",
                className: `${this.prefixCls}-jump-prev`
            };
            jumpNext = {
                showTitle: this.showTitle ? nextItemTitle : null,
                key: "next",

                className: `${this.prefixCls}-jump-next`
            };
            // let className = `${this.prefixCls} ${this.prefixCls}-${allPages}`;

            lastPager = {
                locale: this.locale,
                onClick: () => { this._handleChange.bind(this, allPages) },
                key: allPages,
                page: allPages,
                className: `${prefixCls} ${prefixCls}-${allPages}`,
                showTitle: this.showTitle
            };
            firstPager = {
                locale: this.locale,
                onClick: () => { this._handleChange.bind(this, 1) },
                key: 1,
                page: 1,
                className: `${prefixCls} ${prefixCls}-${1}`,
                showTitle: this.showTitle
            };
            let left = Math.max(1, this._current - pageBufferSize);
            let right = Math.min(this._current + pageBufferSize, allPages);

            if (this._current - 1 <= pageBufferSize) {
                right = 1 + pageBufferSize * 2;
            }

            if (allPages - this._current <= pageBufferSize) {
                left = allPages - pageBufferSize * 2;
            }
            for (let i = left; i <= right; i++) {
                const active = this._current === i;
                const prefixCls = `${this.prefixCls}-item`;
                let className = `${prefixCls} ${prefixCls}-${i}`;
                if (active) {
                    className = `${className} ${prefixCls}-active`;
                }

                pagerList.push({
                    locale: this.locale,
                    onClick: () => { this._handleChange.bind(this, i); },
                    key: i,
                    page: i,
                    className: className,
                    showTitle: this.showTitle
                });

            }
            if (this._current - 1 >= pageBufferSize * 2 && this._current !== 1 + 2) {
                pagerList[0] = Object.assign({}, {
                    className: pagerList[0].className + ` ${this.prefixCls}-item-after-jump-prev`,
                }, pagerList[0])
                // React.cloneElement(pagerList[0], {
                //     className: `${prefixCls}-item-after-jump-prev`,
                // });
                pagerList.unshift(jumpPrev);
            }
            if (allPages - this._current >= pageBufferSize * 2 && this._current !== allPages - 2) {
                pagerList[pagerList.length - 1] = Object.assign({}, {
                    className: pagerList[pagerList.length - 1].className + ` ${this.prefixCls}-item-after-jump-prev`,
                }, pagerList[pagerList.length - 1])
                pagerList.push(jumpNext);
            }
            if (left !== 1) {
                pagerList.unshift(firstPager);
            }
            if (right !== allPages) {
                pagerList.push(lastPager);
            }
        }
    }
    _isValid(page: any) {
        return typeof page === 'number' && page >= 1 && page !== this._current;
    }


    _hasPrev() {
        return this._current > 1;
    }
    _hasNext() {
        return this._current < this._calcPage();
    }
    _prev() {

        if (this._hasPrev()) {
            this._handleChange(Number(this._current) - 1);
        }
    }
    _next() {

        if (this._hasNext()) {

            this._handleChange(Number(this._current) + 1);
        }
    }
    // _jumpPrev() {
    //     this._handleChange(Math.max(1, this._current - (this.showLessItems ? 3 : 5)));
    // }
    // _jumpNext() {
    //     this._handleChange(
    //         Math.min(this._calcPage(), this._current + (this.showLessItems ? 3 : 5))
    //     );
    // }
    update() {
        var _val = this._current.toString();
        let val;
        if (_val == '') {
            val = _val;
        } else if (!isNaN(Number(_val)) && Number(_val) >= 1 && Number(_val) <= this.allPages) {
            val = Number(_val);
        } else {
            val = this._currentTemp;
            this._current = val;
            return;
        }
        //   console.log(val);
        // this._current = Number(val);
        // this.current = Number(val);
        this._handleChange(val);
    }
    _handleChange(p: any) {

        if (p == "prev") {
            p = Math.max(1, this._current - (this.showLessItems ? 3 : 5))
        }
        if (p == "next") {
            p = Math.min(this._calcPage(), this._current + (this.showLessItems ? 3 : 5))
        }
        let page = p;

        if (this._isValid(page)) {
            if (page > this._calcPage()) {
                page = this._calcPage();
            }
            this.pagerList = []
            this._current = page;
            this._currentTemp = page;
            this.render();

            const pageSize = this.pageSize;

            this.onChange.emit({ page, pageSize });
            // this.props.onChange(page, pageSize);

            return page;
        }

        return this._current;
    }
    _calcPage(p?: any) {
        let pageSize = p;
        if (typeof pageSize === 'undefined') {
            pageSize = this.pageSize;
        }
        return Math.floor((this.total - 1) / pageSize) + 1;
    }
}
