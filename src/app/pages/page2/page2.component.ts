//create time:Tue Jun 13 2017 13:39:00 GMT+0800 (中国标准时间)
import { Component,OnInit } from '@angular/core';

@Component({
    selector: 'page2',
    templateUrl: './page2.component.html',
    styleUrls: ['./page2.component.scss']
})
export default class Page2Component implements OnInit  {
    sort = { key: 'rank', order: 'asc' };

    onSort($event: any) {
        const { key, order } = $event;
        this.data.sort((a: any, b: any) => {
            return (key === 'rank' ? b[key] - a[key] : b[key].localeCompare(a[key])) * (order === 'desc' ? 1 : -1);
        });
    }
    toggleData() {
        this.data = this.data ? null : [
            { rank: 1, name: 'Kareem', surname: 'Abdul-Jabbar', points: 38387 },
            { rank: 2, name: 'Karl', surname: 'Malone', points: 36928 },
            { rank: 3, name: 'Kobe', surname: 'Bryant', points: 33643 },
            { rank: 4, name: 'Michael', surname: 'Jordan', points: 32292 },
            { rank: 5, name: 'Wilt', surname: 'Chamberlain', points: 31419 },
            { rank: 6, name: 'Kareem', surname: 'Abdul-Jabbar', points: 38387 },
            { rank: 7, name: 'Karl', surname: 'Malone', points: 36928 },
            { rank: 8, name: 'Kobe', surname: 'Bryant', points: 33643 },
            { rank: 9, name: 'Michael', surname: 'Jordan', points: 32292 },
            { rank: 10, name: 'Wilt', surname: 'Chamberlain', points: 31419 },
            { rank: 11, name: 'Kareem', surname: 'Abdul-Jabbar', points: 38387 },
            { rank: 12, name: 'Karl', surname: 'Malone', points: 36928 },
            { rank: 13, name: 'Kobe', surname: 'Bryant', points: 33643 },
            { rank: 14, name: 'Michael', surname: 'Jordan', points: 32292 },
            { rank: 15, name: 'Wilt', surname: 'Chamberlain', points: 31419 },
        ];
    }

    onRowClick($event: any) {
        console.log('clicked row', $event.data);
    }
    scroll = { y: 400, x: 750 }
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
    pageSizeData=[10,20,30,40,50,60];
    data :any= [
        { rank: 1, name: 'Kareem', surname: 'Abdul-Jabbar', points: 38387 },
        { rank: 2, name: 'Karl', surname: 'Malone', points: 36928 },
        { rank: 3, name: 'Kobe', surname: 'Bryant', points: 33643 },
        { rank: 4, name: 'Michael', surname: 'Jordan', points: 32292 },
        { rank: 5, name: 'Wilt', surname: 'Chamberlain', points: 31419 },
        { rank: 6, name: 'Kareem', surname: 'Abdul-Jabbar', points: 38387 },
        { rank: 7, name: 'Karl', surname: 'Malone', points: 36928 },
        { rank: 8, name: 'Kobe', surname: 'Bryant', points: 33643 },
        { rank: 9, name: 'Michael', surname: 'Jordan', points: 32292 },
        { rank: 10, name: 'Wilt', surname: 'Chamberlain', points: 31419 },
        { rank: 11, name: 'Kareem', surname: 'Abdul-Jabbar', points: 38387 },
        { rank: 12, name: 'Karl', surname: 'Malone', points: 36928 },
        { rank: 13, name: 'Kobe', surname: 'Bryant', points: 33643 },
        { rank: 14, name: 'Michael', surname: 'Jordan', points: 32292 },
        { rank: 15, name: 'Wilt', surname: 'Chamberlain', points: 31419 },
    ];
    ngOnInit() {
        let temp=[]
        for(let i=0;i<100;i++){
            temp.push({
                 rank: i, name: i, surname: i, points: i
            })
        }
        this.data=temp;
    }
}
