import { Component, OnInit } from '@angular/core';



@Component({
	selector: 'radio-demo',
	templateUrl: './demo.component.html',
	styleUrls: ['./demo.component.css'],

})
export class RadioDemoComponent {
	checked = false
	value = '1'
	value2 = '2'
	valueChange(e) { console.log(e) }
	data = [
		{
			param: 'checked',
			description: '是否选中',
			type: `boolean`,
			dValue: 'false'
		}, {
			param: 'disabled',
			description: '是否禁用',
			type: `boolean`,
			dValue: 'false'
		}, {
			param: 'value',
			description: '在CheckGroup模式下，选中值',
			type: `any`,
			dValue: 'false'
		},
	]

	data2 = [
		{
			param: 'value',
			description: '选中值的数组',
			type: `any[]`,
			dValue: '[]'
		},
		{
			param: 'valueChange',
			description: 'value改变监听',
			type: `Function(e:Event)`,
			dValue: '无'
		},
	]
}