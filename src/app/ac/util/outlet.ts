import {Component, Input, TemplateRef, OnChanges} from '@angular/core';

@Component({
  selector: '[ngOut]',
  template: `{{content}}<template [ngTemplateOutlet]="contentTemplate"></template>`,
})
export class ngOut implements OnChanges {
  @Input() ngOut: string | TemplateRef<any>;

  content: string;
  contentTemplate: TemplateRef<any>;

  ngOnChanges(changes?: any) {
    [this.content, this.contentTemplate] = this.ngOut instanceof TemplateRef
                                            ? ['', <TemplateRef<any>>this.ngOut]
                                            : [<string>this.ngOut, null];
  }
}