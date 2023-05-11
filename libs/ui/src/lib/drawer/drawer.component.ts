import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { UIButtonDirective } from '../directives/uibutton.directive';

@Component({
  selector: 'ui-drawer-item',
  template: `
    <button
      uiButton
      type="button"
      [ngClass]="itemStyleClass"
      [style]="itemStyle"
      [tabIndex]="tabIndex"
      class="ui-button-m"
      [style.transition]="transition"
    >
      <i class="material-symbols-rounded text-2xl">{{ icon }}</i>
      <span class="drawer-text">{{ text }}</span>
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerItemComponent {
  @Input() itemStyleClass!: string;
  @Input() itemStyle!: string;
  @Input() transition = '';
  @Input() text!: string;
  @Input() icon!: string;
  @Input() tabIndex!: number;
}

@Component({
  selector: 'ui-drawer-button',
  template: `
    <button
      type="button"
      uiButton
      class="drawer-button button-no-border"
      [ngClass]="buttonStyleClass"
      [style]="buttonStyle"
      [tabIndex]="tabIndex"
      [style.transition]="transition"
    >
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerButtonComponent {
  @Input() buttonStyleClass!: string;
  @Input() buttonStyle!: string;
  @Input() transition = '';
  @Input() tabIndex!: number;
}

@Component({
  selector: 'ui-drawer',
  template: `
    <div
      class="ui-drawer"
      [style.--width]="_collapsed ? '3rem' : '10rem'"
      [ngClass]="drawerStyleClass"
      [style]="drawerStyle"
      [style.transition]="transition"
      [ngClass]="{ 'drawer-collapsed': _collapsed }"
      [style.width.rem]="_collapsed ? collapsedWidth : width"
    >
      <div
        class="drawer-wrapper"
        [style.transition]="transition"
        [ngClass]="{ 'drawer-collapsed': _collapsed }"
        [style.width.rem]="_collapsed ? collapsedWidth : width"
      >
        <div class="ui-drawer-header">
          <ui-drawer-button uiButton id="collapse-button" (click)="toggle()">
            <i
              class="material-symbols-rounded text-3xl"
              [ngClass]="{ 'button-active': _collapsed }"
              >dock_to_right</i
            ></ui-drawer-button
          >
          <ng-content select="[header]"></ng-content>
        </div>
        <div class="ui-drawer-content">
          <ng-content select="[content]"></ng-content>
        </div>
        <div class="ui-drawer-footer">
          <ng-scrollbar class="drawer-scroller">
            <div class="content-wrapper">
              <ng-content select="[footer]"></ng-content>
            </div>
          </ng-scrollbar>
        </div>
      </div>
    </div>
    <div
      class="drawer-content-wrapper"
      [style.left]="_collapsed ? '3rem' : '10rem'"
    >
      <ng-scrollbar class="content-scroller">
        <ng-content select="[body-content]"></ng-content>
      </ng-scrollbar>
    </div>
  `,
  styleUrls: ['./drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerComponent extends EventTarget {
  constructor(private reference: ElementRef) {
    super();
  }

  _collapsed = false;
  @Input() drawerStyleClass!: string;
  @Input() drawerStyle!: string;
  @Input() width = 10;
  @Input() collapsedWidth = 3;
  @Input() transition = 'width 0.6s cubic-bezier(0.165, 1, 0.165, 1)';

  toggle() {
    this._collapsed = !this._collapsed;
    const toggleEvent = new CustomEvent('drawertoggle', {
      detail: this._collapsed,
    });
    (this.reference.nativeElement as HTMLElement).dispatchEvent(toggleEvent);
  }
}

@NgModule({
  imports: [CommonModule, NgScrollbarModule, UIButtonDirective],
  exports: [DrawerComponent, DrawerButtonComponent, DrawerItemComponent],
  declarations: [DrawerComponent, DrawerButtonComponent, DrawerItemComponent],
})
export class DrawerModule {}
