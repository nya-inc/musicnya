import { ElementRef, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  private _shouldCheckOverflow$: Subject<boolean> = new Subject<boolean>();
  shouldCheckOverflow$ = this._shouldCheckOverflow$.asObservable();

  checkOverflow(elementReference: ElementRef) {
    const element = elementReference.nativeElement;
    if (!element) return;

    var curOverflow = element?.style.overflow;
    console.log('checking');

    var isOverflowing =
      element?.clientWidth < element?.scrollWidth ||
      element?.clientHeight < element?.scrollHeight;

    if (isOverflowing) {
      (element?.firstChild as HTMLElement)?.setAttribute('tabIndex', '-1');
      (element?.firstChild as HTMLElement).style.visibility = 'hidden';
    } else {
      (element?.firstChild as HTMLElement)?.setAttribute('tabIndex', '1');
      (element?.firstChild as HTMLElement).style.visibility = 'visible';
    }
  }

  triggerCheck() {
    this._shouldCheckOverflow$.next(true);
  }
}
