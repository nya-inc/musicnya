import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[disableChildTabIndex]',
  standalone: true,
})
export class DisableChildTabIndexDirective {
  @HostBinding('tabindex') tabIndex = -1;
}
