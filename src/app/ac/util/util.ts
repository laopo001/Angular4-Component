import {ElementRef, Renderer} from '@angular/core';

export function toBoolean(value: any): boolean {
  switch (value) {
    case '':
      return true;

    case 'false':
    case '0':
      return false;

    default:
      return !!value;
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

export  function contains(root: any, el: any) {
    if (root.compareDocumentPosition)
        return root === el || !!(root.compareDocumentPosition(el) & 16);
    if (root.contains && el.nodeType === 1) {
        return root.contains(el) && root !== el;
    }
    while ((el = el.parentNode))
        if (el === root) return true;
    return false;
}