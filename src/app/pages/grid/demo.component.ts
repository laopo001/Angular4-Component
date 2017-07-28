import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { message } from '../../ac/message/'


@Component({
	selector: 'grid-demo',
	templateUrl: './demo.component.html',
	styleUrls: ['./demo.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class GridDemoComponent {
	opened = false
	openedChange(e) { console.log(e) }
	onConfirm(e) {
		if (e) { message.success('点击确定') } else {
			message.warning('点击取消')
		}
	}
	data = [
		{
			param: 'gutter',
			description: '栅格间隔',
			type: `number`,
			dValue: '0'
		}, {
			param: 'type',
			description: '布局模式，可选 flex，现代浏览器 下有效',
			type: `string`,
			dValue: ``
		}, {
			param: 'align',
			description: '	flex 布局下的垂直对齐方式：top middle bottom',
			type: `string`,
			dValue: `'top'`
		}, {
			param: 'justify',
			description: 'flex 布局下的水平排列方式：start end center space-around space-between',
			type: `string`,
			dValue: `'start'`
		},
	]
	data2 = [
		{
			param: 'span',
			description: '栅格占位格数，为 0 时相当于 display: none',
			type: `number`,
			dValue: '-'
		}, {
			param: 'order',
			description: '栅格顺序，flex 布局模式下有效',
			type: `number`,
			dValue: `0`
		}, {
			param: 'offset',
			description: '栅格左侧的间隔格数，间隔内不可以有栅格',
			type: `number`,
			dValue: `0`
		}, {
			param: 'push',
			description: '栅格向右移动格数',
			type: `number`,
			dValue: `0`
		}, {
			param: 'pull',
			description: '栅格向左移动格数',
			type: `number`,
			dValue: `0`
		}, {
			param: 'xs',
			description: '<768px 响应式栅格，可为栅格数或一个包含其他属性的对象',
			type: `number|object`,
			dValue: `-`
		}, {
			param: 'sm',
			description: '≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象',
			type: `number|object`,
			dValue: `-`
		}, {
			param: 'md',
			description: '≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象',
			type: `number|object`,
			dValue: `-`
		}, {
			param: 'lg',
			description: '≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象',
			type: `number|object`,
			dValue: `-`
		}, {
			param: 'xl',
			description: '≥1600px 响应式栅格，可为栅格数或一个包含其他属性的对象',
			type: `number|object`,
			dValue: `-`
		},
	]
}