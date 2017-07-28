import { Component, OnInit } from '@angular/core';
import { message } from '../../ac/message/'


@Component({
	selector: 'popconfirm-demo',
	templateUrl: './demo.component.html',
	styleUrls: ['./demo.component.css'],

})
export class PopconfirmDemoComponent {
	opened = false
	openedChange(e) { console.log(e) }
	onConfirm(e) {
		if (e) { message.success('点击确定') } else {
			message.warning('点击取消')
		}
	}
	data = [
		{
			param: 'title',
			description: '确认框的描述',
			type: `string||TemplateRef<any>`,
			dValue: '无'
		}, {
			param: 'trigger',
			description: '触发方式',
			type: `'click' | 'hover' | 'focus'`,
			dValue: `'click'`
		}, {
			param: 'placement',
			description: '弹出位置',
			type: `'top' | 'right' | 'bottom' | 'left' |
    'bottomRight' | 'topRight' | 'bottomLeft' | 'topLeft' |
    'rightBottom' | 'leftBottom' | 'rightTop' | 'leftTop';`,
			dValue: `'bottom'`
		}, {
			param: 'onConfirm',
			description: '点击回调',
			type: `	function(e)`,
			dValue: '无'
		}, {
			param: 'onOk',
			description: '点击确定回调',
			type: `	function(e)`,
			dValue: '无'
		}, {
			param: 'onCancel',
			description: '点击取消回调',
			type: `	function(e)`,
			dValue: '无'
		}, {
			param: 'okText',
			description: '确认按钮文字',
			type: `string`,
			dValue: `'ok'`
		}, {
			param: 'cancelText',
			description: '确认取消文字',
			type: `string`,
			dValue: `'cancel'`
		},
	]

}