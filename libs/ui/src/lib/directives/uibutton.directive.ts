import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[uiButton]',
  standalone: true,
})
export class UIButtonDirective {
  constructor(public element?: ElementRef) {}

  addDrawerClass() {
    (this.element?.nativeElement as HTMLElement).classList.value +=
      ' drawer-button';
  }
}
