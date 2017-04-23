import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import LOCALE from './locale/zh_CN';

function classNames(obj: Pagination) {

    var { prefixCls, isSmall } = obj;

    return {
        'mini': isSmall,

        [`${obj.class}`]: !!obj.class
    }
}
function noop() {
}




@Component({
    selector: 'Pagination',
    templateUrl: './pagination.component.html',

})
export class Pagination implements OnInit {

    @Input() size: string;
    isSmall: boolean;

    @Input() defaultCurrent = 1;
    @Input() total = 0;
    @Input() defaultPageSize = 10;
    @Input() onChange = noop;


    @Input() selectComponentClass: any = null;
    @Input() showQuickJumper = false;
    @Input() showSizeChanger = false;
    @Input() showLessItems = false;
    @Input() showTitle = true;
    @Input() onShowSizeChange = noop;
    @Input() locale = LOCALE;
    @Input() showTotal: any;

    current = 1;
    pageSize = 10;

    pagerList: any[] = [];





    @Input() class: string;
    @Input() style: any;

    currClasses = {};

    prefixCls = 'ant-pagination';
    selectPrefixCls = 'ant-select';
    showTotalClass = {};
    showTotalText = "";
    _prevClass = {};
    _nextClass = {}
    @Output() Change = new EventEmitter();
    constructor() {

    }

    ngOnInit() {
        this.isSmall = this.size === 'small';
        this.currClasses = classNames(this);

        this.showTotalClass = { [`${this.prefixCls}-total-text`]: true };
        this.showTotalText = this.showTotal(
            this.total,
            [
                (this.current - 1) * this.pageSize + 1,
                this.current * this.pageSize > this.total ? this.total : this.current * this.pageSize,
            ]
        )
        this._prevClass = { [`${this._hasPrev() ? '' : `${this.prefixCls}-disabled`}`]: true, [`${this.prefixCls}-prev`]: true };
        this._nextClass = { [`${this._hasNext() ? '' : `${this.prefixCls}-disabled`}`]: true, [`${this.prefixCls}-next`]: true };
        const allPages = this._calcPage();
        //       const pagerList: any[] = [];

        let jumpPrev = null;
        let jumpNext = null;
        let firstPager = null;
        let lastPager = null;
        const pageBufferSize = this.showLessItems ? 1 : 2;
        const { current, pageSize, pagerList } = this;

        if (allPages <= 5 + pageBufferSize * 2) {
            for (let i = 1; i <= allPages; i++) {
                const active = this.current === i;
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

                onClick: this._jumpPrev,
                className: `${this.prefixCls}-jump-prev`
            };
            jumpNext = {
                showTitle: this.showTitle ? nextItemTitle : null,
                key: "next",

                onClick: this._jumpNext,
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
            let left = Math.max(1, current - pageBufferSize);
            let right = Math.min(current + pageBufferSize, allPages);

            if (current - 1 <= pageBufferSize) {
                right = 1 + pageBufferSize * 2;
            }

            if (allPages - current <= pageBufferSize) {
                left = allPages - pageBufferSize * 2;
            }
            for (let i = left; i <= right; i++) {
                const active = current === i;
                const prefixCls = `${this.prefixCls}-item`;
                let className = `${prefixCls} ${prefixCls}-${i}`;
                if (active) {
                    className = `${className} ${prefixCls}-active`;
                }

                pagerList.push({
                    locale: this.locale,
                    onClick: () => { this._handleChange.bind(this, i); console.log(123) },
                    key: i,
                    page: i,
                    className: className,
                    showTitle: this.showTitle
                });

            }
            if (current - 1 >= pageBufferSize * 2 && current !== 1 + 2) {
                pagerList[0] = Object.assign({}, {
                    className: pagerList[0].className + ` ${this.prefixCls}-item-after-jump-prev`,
                }, pagerList[0])
                // React.cloneElement(pagerList[0], {
                //     className: `${prefixCls}-item-after-jump-prev`,
                // });
                pagerList.unshift(jumpPrev);
            }
            if (allPages - current >= pageBufferSize * 2 && current !== allPages - 2) {
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
        return typeof page === 'number' && page >= 1 && page !== this.current;
    }


    _hasPrev() {
        return this.current > 1;
    }
    _hasNext() {
        return this.current < this._calcPage();
    }
    _prev() {
        console.log(123)
        if (this._hasPrev()) {
            this._handleChange(this.current - 1);
        }
    }
    _next() {
        if (this._hasNext()) {
            this._handleChange(this.current + 1);
        }
    }
    _jumpPrev() {
        this._handleChange(Math.max(1, this.current - (this.showLessItems ? 3 : 5)));
    }
    _jumpNext() {
        this._handleChange(
            Math.min(this._calcPage(), this.current + (this.showLessItems ? 3 : 5))
        );
    }
    _handleChange(p: any) {
        
        if (p == "prev") {
            p = Math.max(1, this.current - (this.showLessItems ? 3 : 5))
        }
        if (p == "next") {
            p = Math.min(this._calcPage(), this.current + (this.showLessItems ? 3 : 5))
        }
        let page = p;

        if (this._isValid(page)) {
            if (page > this._calcPage()) {
                page = this._calcPage();
            }
            this.pagerList = []
            this.current = page;
            this.ngOnInit();
            // if (!('current' in this)) {
            //     this.current=page;
            //    // this.ngOnInit();
            //     this.pagerList=[]
            //     // this.setState({
            //     //     current: page,
            //     //     _current: page,
            //     // });
            // }

            const pageSize = this.pageSize;
            // this.props.onChange(page, pageSize);

            return page;
        }

        return this.current;
    }
    _calcPage(p?: any) {
        let pageSize = p;
        if (typeof pageSize === 'undefined') {
            pageSize = this.pageSize;
        }
        return Math.floor((this.total - 1) / pageSize) + 1;
    }
}
