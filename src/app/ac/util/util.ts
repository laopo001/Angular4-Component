import { ElementRef, Renderer } from '@angular/core';

export function toBoolean(value: any): boolean {

  switch (value) {
    case '':
      return true;
    case 'true':
      return true;
    case 'false':
    case '1':
      return true;
    case '0':
      return false;
    default:
      return !!value;
  }
}

export function toBoolean2(value: any): boolean {
  switch (value) {
    case '':
      return true;
    case 'true':
      return true;
    case 'false':
    case '1':
      return true;
    case '0':
      return false;

    default:
      return value;
  }
}
export function format(formatFnc: Function) :any{
    return function (target: any, key: string,descriptor) {
        //var t = Reflect.getMetadata("design:type", target, key);
        //console.log(`${key} type: ${t.name}`);
        Object.defineProperty(target, key, {
            set: function (x) {
                this['$_' + key] = formatFnc(x)
            },
            get: function () {
                return this['$_' + key];
            }
        })
    }
}


export function toWidth(width: any): any {
  if (width == null) { return width }
  if (width.toString().indexOf('%') > -1) {
    return width;
  } else {
    return width + 'px';
  }

}

let idCounter = 0;
export function uniqueId(prefix = 'uid') {
  return `ngl_${prefix}_${++idCounter}`;
}

export interface IReplaceClass {
  renderer: Renderer;
  element: ElementRef;
};

export function replaceClass(instance: IReplaceClass, oldClass: string | string[], newClass?: string | string[]) {
  if (oldClass && oldClass !== newClass) {
    setClass(instance, oldClass, false);
  }
  if (newClass) {
    setClass(instance, newClass, true);
  }
}

function setClass(instance: IReplaceClass, klasses: string | string[], isAdd: boolean) {
  if (klasses) {
    (Array.isArray(klasses) ? klasses : [klasses]).forEach(k => {
      instance.renderer.setElementClass(instance.element.nativeElement, k, isAdd);
    });
  }
}

export function contains(root: any, el: any) {
  if (root.compareDocumentPosition)
    return root === el || !!(root.compareDocumentPosition(el) & 16);
  if (root.contains && el.nodeType === 1) {
    return root.contains(el) && root !== el;
  }
  while ((el = el.parentNode))
    if (el === root) return true;
  return false;
}

export function stopDefault(e: any) {
  //阻止默认浏览器动作(W3C)
  if (e && e.preventDefault)
    e.preventDefault();
  //IE中阻止函数器默认动作的方式
  else
    window.event.returnValue = false;
  return false;
}

export function stopBubble(e: any) {
  //如果提供了事件对象，则这是一个非IE浏览器
  if (e && e.stopPropagation)
    //因此它支持W3C的stopPropagation()方法
    e.stopPropagation();
  else
    //否则，我们需要使用IE的方式来取消事件冒泡
    window.event.cancelBubble = true;
}


export function waining(b, messsage) {
  if (process.env.NODE_ENV === 'dev' && b) {
    console.warn(messsage)
  }
}
