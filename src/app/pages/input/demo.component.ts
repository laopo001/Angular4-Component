import { Component, OnInit } from '@angular/core';


@Component({
	selector: 'input-demo',
	templateUrl: './demo.component.html',
	styleUrls: ['./demo.component.css']
})
export class InputDemoComponent implements OnInit {
	value1 = ''
	ngOnInit() {

	}
	valueChange(value) {
		console.log(this.value1, 'valueChange')
	}
	onEnter() {
		console.log(this.value1, 'onEnter')
	}
	debounceChange() {
		console.log(this.value1, 'debounceChange')
	}
	throttleChange() {
		console.log(this.value1, 'throttleChange')
	}
	Value = "http"
	Value2 = '.com'
	searchInput = ''
	data = [{
		param: 'width',
		description: '宽度,当使用前/后置标签时，有默认宽度',
		type: `百分比|number `,
		dValue: '100%'
	}, {
		param: 'value',
		description: 'input值',
		type: `string`,
		dValue: `''`
	}, {
		param: 'size',
		description: '大小',
		type: `large|default|small`,
		dValue: `default`
	}, {
		param: 'disabled',
		description: '禁用',
		type: `boolean`,
		dValue: `false`
	}, {
		param: 'addonBefore',
		description: '带标签的 input，设置前置标签',
		type: `string | TemplateRef<any>`,
		dValue: `无`
	}, {
		param: 'addonAfter',
		description: '带标签的 input，设置后置标签',
		type: `string | TemplateRef<any>`,
		dValue: `无`
	}, {
		param: 'prefix',
		description: '带有前缀图标的 input',
		type: `string | TemplateRef<any>`,
		dValue: `无`
	}, {
		param: 'suffix',
		description: '带有后缀图标的 input',
		type: `string | TemplateRef<any>`,
		dValue: `无`
	}, {
		param: 'time',
		description: '防抖/节流的时间间隔',
		type: `Int`,
		dValue: `1000`
	}, {
		param: 'option',
		description: '防抖/节流的参数，参见lodash的文档',
		type: `Object`,
		dValue: `{'leading': false,'trailing': true }`
	}, {
		param: 'valueChange',
		description: 'value改变监听',
		type: `Function(e:Event)`,
		dValue: '无'
	}, {
		param: 'onEnter',
		description: '回车触发',
		type: `Function(e:Event)`,
		dValue: `无`
	}, {
		param: 'debounceChange',
		description: '防抖',
		type: `Function(e:Event)`,
		dValue: `无`
	}, {
		param: 'throttleChange',
		description: '节流',
		type: `Function(e:Event)`,
		dValue: `无`
	},]
	data2 = [{
		param: 'width',
		description: '宽度,当使用前/后置标签时，有默认宽度',
		type: `百分比|number `,
		dValue: '100%'
	}, {
		param: 'value',
		description: 'input值',
		type: `string`,
		dValue: `''`
	}, {
		param: 'row',
		description: '多少行高度',
		type: `number`,
		dValue: `1`
	}, {
		param: 'autosize',
		description: '自动高度：如{minRows:2,maxRows:3}',
		type: `Object`,
		dValue: `无`
	},]
}