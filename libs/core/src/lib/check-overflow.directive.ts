import { Directive, ElementRef, HostListener } from '@angular/core';
import { UtilitiesService } from './utilities.service';

@Directive({
  selector: '[checkOverflow]',
  standalone: true,
})
export class CheckOverflowDirective {
  constructor(
    private elementReference: ElementRef,
    private utilities: UtilitiesService
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.utilities.checkOverflow(this.elementReference);
  }
}
