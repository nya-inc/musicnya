import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';

@Component({
  selector: 'ui-nya-button',
  template: `
    <button
      uiButton
      type="button"
      [ngClass]="buttonStyleClass"
      [style]="buttonStyle"
      [tabIndex]="tabIndex"
      class="ui-button-m"
      [style.transition]="transition"
    >
      <i class="material-symbols-rounded text-2xl">{{ icon }}</i>
      <span class="drawer-text">{{ text }}</span>
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./nya-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NyaButtonComponent {
  @Input() buttonStyleClass!: string;
  @Input() buttonStyle!: string;
  @Input() transition = '';
  @Input() tabIndex!: number;
  @Input() icon!: string;
  @Input() text!: string;
}

@NgModule({
  imports: [CommonModule],
  exports: [NyaButtonComponent],
  declarations: [NyaButtonComponent],
})
export class NyaButtonModule {}
