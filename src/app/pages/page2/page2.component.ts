//create time:Tue Jun 13 2017 13:39:00 GMT+0800 (中国标准时间)
import { Component } from '@angular/core';

@Component({
    selector: 'page2',
    templateUrl: './page2.component.html',
    styleUrls: ['./page2.component.scss']
})
export default class Page2Component {
    columns = [{
        title: 'Name',
        key: 'name',

    }, {
        title: 'Age',
        key: 'age',
    }, {
        title: 'Address',
        key: 'address',
    }, {
        title: 'Action',
        key: 'action',

    }];
    data = [{
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
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
}
