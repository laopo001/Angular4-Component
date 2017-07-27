import { Component, OnInit } from '@angular/core';



@Component({
	selector: 'checkbox-demo',
	templateUrl: './demo.component.html',
	styleUrls: ['./demo.component.css'],

})
export class CheckboxDemoComponent {
	checked = false
	value = ['1']
	valueChange(e) { console.log(this.value) }
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