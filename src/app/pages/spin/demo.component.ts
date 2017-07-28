import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { message } from '../../ac/message/'


@Component({
	selector: 'spin-demo',
	templateUrl: './demo.component.html',
	styleUrls: ['./demo.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class SpinDemoComponent {
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
			param: 'spin',
			description: '是否旋转',
			type: `boolean`,
			dValue: 'true'
		}, {
			param: 'size',
			description: '组件大小，可选值为 small default large',
			type: `	string`,
			dValue: `'default'`
		}, {
			param: 'tip',
			description: '当作为包裹元素时，可以自定义描述文案',
			type: `	string`,
			dValue: `''`
		}
	]

}