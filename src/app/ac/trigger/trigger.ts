import {
  Directive, Input, ElementRef, ComponentRef, TemplateRef, ViewContainerRef,
  Renderer, ComponentFactoryResolver, Injector, EmbeddedViewRef, ComponentFactory,
  Output, EventEmitter, NgZone
} from '@angular/core';

import 'rxjs/add/operator/take';
import { NglPopover } from './popover';
var Tether = require('tether');
import { toBoolean } from '../util/util';

type Direction = 'top' | 'right' | 'bottom' | 'left';
const attachments = <{ [key: string]: any }>{
  top: { attachment: 'bottom center', offset: '0 0', opposite: 'bottom' },
  left: { attachment: 'middle right', offset: '0 0', opposite: 'right' },
  right: { attachment: 'middle left', offset: '0 0', opposite: 'left' },
  bottom: { attachment: 'top center', offset: '0 0', opposite: 'top' },

  bottomRight: { attachment: 'top right', offset: '0 0', opposite: 'topRight' },
  topRight: { attachment: 'bottom right', offset: '0 0', opposite: 'bottomRight' },

  bottomLeft: { attachment: 'top left', offset: '0 0', opposite: 'topLeft' },
  topLeft: { attachment: 'bottom left', offset: '0 0', opposite: 'bottomLeft' },

  rightBottom: { attachment: 'left bottom', offset: '0 0', opposite: 'leftBottom' },
  leftBottom: { attachment: 'right bottom', offset: '0 0', opposite: 'rightBottom' },

  rightTop: { attachment: 'left top', offset: '0 0', opposite: 'leftTop' },
  leftTop: { attachment: 'right top', offset: '0 0', opposite: 'rightTop' },


};
const PLACEMENTS = Object.keys(attachments).reduce((placements: any, direction: Direction) => {
  const { attachment, offset, opposite } = attachments[direction];
  const targetAttachment = attachments[opposite].attachment;

  placements[direction] = { opposite, attachment, targetAttachment, offset };
  return placements;
}, {});

function placement(direction: Direction) {
  return PLACEMENTS[direction];
}
type Method = 'click' | 'hover' | 'focus' | 'focusClick';


@Directive({
  selector: '[triggerTarget]',
  exportAs: 'nglPopover',
})
export default class Trigger {

  @Input() triggerTarget: string | TemplateRef<any>;

  // @Input() nglPopoverHeader: string;
  // @Input() nglPopoverFooter: string;

  @Input() set placement(placement: Direction) {
    this._placement = placement || 'top';
    this.setTether();
  }

  @Input() set nglPopoverTheme(theme: string) {
    this.theme = theme;
    this.setPopover();
  }

  @Input() nglTooltip: string | boolean;

  @Input() set nglPopoverDelay(delay: any | any[]) {
    delay = Array.isArray(delay) ? delay : [delay, delay];
    [this.openDelay, this.closeDelay] = delay.map(Number);
  }

  @Input() set nglInteractive(interactive: boolean | string) {
    this.interactive = toBoolean(interactive);
  }
  get nglInteractive() {
    return this.interactive;
  }

  @Input() set open(open: boolean) {
    this.toggle(open, open ? this.openDelay : this.closeDelay);
  }

  // Emit an event when actual popover is shown or hidden
  @Output() nglPopoverToggled = new EventEmitter<boolean>();

  private popover: NglPopover;
  private popoverFactory: ComponentFactory<NglPopover>;
  private componentRef: ComponentRef<NglPopover>;
  private viewRef: EmbeddedViewRef<any>;
  private _placement: Direction = 'top';
  private theme: string;
  private tether: any;
  private openDelay = 0;
  private closeDelay = 0;
  private toggleTimeout: any = null;
  private interactive = false;
  private interactiveSubscription: any = null;

  constructor(private element: ElementRef, private viewContainer: ViewContainerRef, private injector: Injector,
    private ngZone: NgZone,
    private renderer: Renderer, componentFactoryResolver: ComponentFactoryResolver) {
    this.popoverFactory = componentFactoryResolver.resolveComponentFactory(NglPopover);
  }

  // Expose open method
  openFun(delay = this.openDelay) {
    this.toggle(true, delay);
  }

  // Expose close method
  close(delay = this.closeDelay) {
    this.toggle(false, delay);
  }

  position(async = true) {
    this.ngZone.runOutsideAngular(() => {
      if (async) {
        setTimeout(() => {
          if (this.tether == null) { return };
          this.tether.position()
        });
      } else {
        this.tether.position();
      }
    });
  }

  // ngOnChanges(changes: any) {
  //     console.log(123)
  // }

  ngOnDestroy() {
    this.destroy();
  }

  private toggle(open: boolean, delay: number) {
    if (this.toggleTimeout) {
      clearTimeout(this.toggleTimeout);
      this.toggleTimeout = null;
    }

    const toggleFn = (open ? this.create : this.destroy).bind(this);

    if (delay > 0) {
      this.toggleTimeout = setTimeout(() => {
        this.toggleTimeout = null;
        toggleFn();
      }, delay);
    } else {
      toggleFn();
    }
  }

  private setTether(create = false) {
    if (!this.tether && !create) return;

    const { attachment, targetAttachment, offset } = placement(this._placement);
    const options = {
      element: this.popover.element.nativeElement,
      target: this.element.nativeElement,
      attachment,
      targetAttachment,
      offset,
      constraints: [
        {
          to: 'window',
          attachment: 'together'
        }
      ]
    };


    if (create) {
      this.tether = new Tether(options);
    } else {
      this.tether.setOptions(options);
    }

    this.setPopover();
  }

  private setPopover() {
    if (!this.popover) return;

    const { opposite } = placement(this._placement);
    this.popover.nubbin = opposite;
    this.popover.theme = this.theme;
    this.popover.nglTooltip = this.nglTooltip;
  }

  private create() {
    if (this.componentRef) return;

    const { nodes, viewRef } = this.getProjectableNodes();
    this.viewRef = viewRef;

    this.componentRef = this.viewContainer.createComponent(this.popoverFactory, 0, this.injector, [nodes]);
    this.popover = this.componentRef.instance;
    // this.popover.header = this.nglPopoverHeader;
    // this.popover.footer = this.nglPopoverFooter;
    this.popover.afterViewInit.take(1).subscribe(() =>
      //修改成异步
      this.position(true)
    );

    if (this.nglInteractive) {
      this.interactiveSubscription = this.popover.onInteraction.subscribe((enter: boolean) => this.open = enter);
    }

    this.setTether(true);

    // To avoid unexpected behavior when template "lives" inside an OnPush
    // component, explicitlly request change detection to run on creation.
    this.popover.changeDetector.markForCheck();

    this.nglPopoverToggled.emit(true);
  }

  private getProjectableNodes(): { nodes: any[], viewRef?: EmbeddedViewRef<any> } {
    if (this.triggerTarget instanceof TemplateRef) {
      const viewRef: EmbeddedViewRef<any> = this.viewContainer.createEmbeddedView(<TemplateRef<any>>this.triggerTarget);
      return { nodes: viewRef.rootNodes, viewRef };
    } else {
      return { nodes: [this.renderer.createText(null, <string>this.triggerTarget)] };
    }
  }

  private destroy() {
    if (!this.componentRef) return;

    this.tether.destroy();
    this.tether = null;

    // Cleanup template view
    if (this.viewRef) {
      this.viewContainer.remove(this.viewContainer.indexOf(this.viewRef));
      this.viewRef = null;
    }

    this.viewContainer.remove(this.viewContainer.indexOf(this.componentRef.hostView));
    this.componentRef.destroy();
    this.componentRef = null;
    this.popover = null;

    if (this.interactiveSubscription) {
      this.interactiveSubscription.unsubscribe();
    }

    this.nglPopoverToggled.emit(false);
  }
};
