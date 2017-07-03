//<reference path="node_modules\reflect-metadata\reflect-metadata.d.ts"/>
import { Component,OnInit } from '@angular/core';

// import "reflect-metadata";
const formatMetadataKey = Symbol("format");

declare var Reflect: any;

function format(formatString: string) {
debugger;
    return Reflect.metadata(formatMetadataKey, formatString);
}

function getFormat(target: any, propertyKey: string) {
    debugger
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

class Greeter {
    @format("Hello, %s")
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        let formatString = getFormat(this, "greeting");
        return formatString.replace("%s", this.greeting);
    }
}

@Component({
    selector: 'page3',
    templateUrl: './page3.component.html',
    styleUrls: ['./page3.component.scss']
})
export default class Page3Component implements OnInit {
    ngOnInit() {
        let q=new Greeter('123')
        console.log(q.greet());
    }
}
