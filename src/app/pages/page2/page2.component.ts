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
    data = [
        { rank: 1, name: 'Kareem', surname: 'Abdul-Jabbar', points: 38387 },
        { rank: 2, name: 'Karl', surname: 'Malone', points: 36928 },
        { rank: 3, name: 'Kobe', surname: 'Bryant', points: 33643 },
        { rank: 4, name: 'Michael', surname: 'Jordan', points: 32292 },
        { rank: 5, name: 'Wilt', surname: 'Chamberlain', points: 31419 },
    ];
}
