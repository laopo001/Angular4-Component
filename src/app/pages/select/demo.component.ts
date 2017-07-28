import { Component, OnInit } from '@angular/core';


@Component({
	selector: 'input-demo',
	templateUrl: './demo.component.html',
	styleUrls: ['./demo.component.css']
})
export class SelectDemoComponent implements OnInit {
	Value = 'http'
	Value2 = null
	ngOnInit() {
  
	}
	Value3 = 'www.baidu.com'

	searchInput = ''
	data = [{
		param: 'width',
		description: '宽度,在上下同宽模式下必填',
		type: `百分比|number `,
		dValue: `''`
	}, {
		param: 'value',
		description: '选中值',
		type: `any`,
		dValue: `null`
	}, {
		param: 'placeholder',
		description: '提示语，在value为null时显示',
		type: `string`,
		dValue: `'请输入'`
	}, {
		param: 'disabled',
		description: '禁用',
		type: `boolean`,
		dValue: `false`
	}, {
		param: 'showSearch',
		description: '开启搜索功能,只能在使用data渲染时',
		type: `boolean`,
		dValue: `false`
	}, {
		param: 'data',
		description: '根据data渲染option',
		type: `[{label:xxxx,value:xxxx,disabled:false}]`,
		dValue: `[]`
	}, {
		param: 'dropdownMatchSelectWidth',
		description: '下拉菜单和选择器同宽',
		type: `boolean`,
		dValue: `true`
	}, {
		param: 'size',
		description: '选择框大小，可选 large small',
		type: `'large' | 'small' | 'default'`,
		dValue: `'default'`
	},]
	data2 = [{
		param: 'label',
		description: '选中该 Option 后，Select 显示的值(必填)',
		type: `string `,
		dValue: `''`
	}, {
		param: 'value',
		description: 'option值(必填)',
		type: `string`,
		dValue: `''`
	}, {
		param: 'disabled',
		description: '禁用',
		type: `boolean`,
		dValue: `false`
	}]
}