import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import * as clonedeep from 'lodash.clonedeep'
let data = []
for (let i = 0; i < 100; i++) {
	data.push({
		key: i,
		name: i + 'Name',
		age: i,
		address: i + ' New York',
	})
}

@Component({
	selector: 'table-demo',
	templateUrl: './demo.component.html',
	styleUrls: ['./demo.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class TableDemoComponent implements OnInit {
	data = [{
		key: '1',
		name: 'John Brown',
		age: 10,
		address: 'New York No. 1 Lake Park',
		__disabled__: true
	}, {
		key: '2',
		name: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
	}, {
		key: '3',
		name: 'Joe Black',
		age: 32,
		address: 'Sidney No. 1 Lake Park',
	}];
	data2 = clonedeep(data);
	data3 = clonedeep(data);
	constructor() { }
	pagination = {
		pageSizeData: [10, 20, 50, 100]
	}
	scroll: any = { y: 400 }
	scroll2: any = { x: 2400, y: 300 }
	sort = { key: 'age', order: 'asc' };
	onSort($event: any) {
		const { key, order } = $event;
		console.log($event)
		this.data = clonedeep(this.data.sort((a: any, b: any) => {
			return (key === 'age' ? b[key] - a[key] : b[key].localeCompare(a[key])) * (order === 'desc' ? 1 : -1);
		}));
	}
	rowSelection: any = {
		type: 'checkbox',
		onChange: (selectedRows) => {
			console.log(selectedRows)
		},
	};
	selects = []
	rowSelection2: any = {
		type: 'checkbox',
		onChange: (selectedRows) => {
			console.log(selectedRows)
			this.selects = selectedRows;
		},
	};
	_rowSelection3 = {
		type: 'checkbox',
		onChange: (selectedRows) => {
			console.log(selectedRows)
		},
	};
	get rowSelection3() {
		if (this.rowSelect) {
			return this._rowSelection3
		} else {
			return null;
		}

	}
	ExpandedRow = false;
	rowSelect = false;
	showTableHeader = false;
	get header() {
		if (this.showTableHeader) {

			return 'this is header'
		} else {
			return false;
		}
	}
	showTableFooter = false;
	get footer() {
		if (this.showTableFooter) {
			return 'this is Footer'
		} else {
			return false;
		}
	}
	size = 'large';
	loading = false;
	ngOnInit() {

	}
	tempData = []
	_nodata = false;
	set nodata(x) {
		if (x) {
			this.tempData = this.data3
			this.data3 = [];
		} else {
			this.data3 = this.tempData;
		}
		this._nodata = x;
	}
	get nodata() {
		return this._nodata;
	}
	rowClassName(row, index) {
		if (row.age > 40) {
			return { red: true }
		}
	}
	showText = `
	acTable:
		size:string    可large|middle|small 默认large
		rowKey:string   //唯一值，主键
		sort:{ key: 'age', order: 'asc' }; //双向绑定 默认{ key: '', order: 'asc' }
		header: string|TemplateRef<any>;  //自定义header template
		footer: string|TemplateRef<any>; //自定义header template
		pagination:{                     //自定义分页参数
			pageSizeData: [],
			size: 'default',   可default|small
			showQuickJumper: false
  		};
		loading:boolean                  //是否加载
		scroll:{x:1000 ,y:400}           //滚动
		data:any[]                       //数据
		rowSelection: any = {
			type: 'checkbox',        //check|radio
			selectedRows:[{ rowKey :1}]    //根据rowKey决定被选中的。
			onChange: (selectedRows) => {   //选择后的回调，根据rowKey决定，翻页有效。
				console.log(selectedRows)
			},
		};
		rowClassName: Function(record, index):Object 表格行的类名
			如 return {red:true};
	
	acTable-column
		width:number //列宽带度，当设置x滚动时，最好全部设置。
		heading:string  //表头
		key:string		//key
		fixLeft:boolean  //是否固定在左边
		fixRigth:boolean //是否固定在右边
		headClass    //表头th的类
		cellClass    //表格td的类

	columnCell  //自定义cell template
		let-row="row"	当前row
		let-index="index" 当前index
		let-item="$implicit" 当前key的value

	columnHead  //自定义表头template


	acNoData //自定义没有数据时的template  默认 <template #NoData>没有数据</template>

	acExpandedRow //可展开行
		let-row="row"	当前row
		let-index="index" 当前index

	`
}