import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-heading',
  standalone: true,
  imports: [CommonModule],
  template: `<span id="heading-text"><ng-content></ng-content></span>`,
  styleUrls: ['./heading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class HeadingComponent {
  @Input() text!: string;
  @HostBinding('class') @Input() size!: string;
}
