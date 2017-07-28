import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { message } from '../../ac/message/'


@Component({
	selector: 'pagination-demo',
	templateUrl: './demo.component.html',
	styleUrls: ['./demo.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class PaginationDemoComponent {
	current = 1
	current2 = 1;
	pageSize2 = 10;
	showTotal(total: number, range: number[]) {
		return `${range[0]}-${range[1]} of ${total} items`;
	}
	select() {
		console.log(this.current2,this.pageSize2)
		message.success(`current:${this.current2}---pageSize:${this.pageSize2}`)
	}

	data = [
		{
			param: 'current',
			description: '当前页数(可双向)',
			type: `number`,
			dValue: '1'
		}, {
			param: 'defaultCurrent',
			description: '默认的当前页数',
			type: `number`,
			dValue: `1`
		}, {
			param: 'total',
			description: '数据总数',
			type: `number`,
			dValue: `0`
		}, {
			param: 'pageSize',
			description: '每页条数(可双向)',
			type: `number`,
			dValue: `10`
		}, {
			param: 'defaultPageSize',
			description: '默认的每页条数',
			type: `number`,
			dValue: `10`
		}, {
			param: 'pageSizeData',
			description: '每页条数的选择项',
			type: `number[]`,
			dValue: `[]`
		}, {
			param: 'showQuickJumper',
			description: '是否可以快速跳转',
			type: `Boolean`,
			dValue: `false`
		}, {
			param: 'size',
			description: '尺寸',
			type: `'small' | 'default'`,
			dValue: `'default'`
		}, {
			param: 'simple',
			description: '是否简洁版本',
			type: `Boolean`,
			dValue: `'false'`
		},
	]

}