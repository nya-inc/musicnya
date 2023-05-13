import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  HostListener,
  Input,
  NgModule,
  QueryList,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { Subscription, tap } from 'rxjs';
import { BaseComponent, DrawerEvent } from '@nyan-inc/core';

@Component({
  selector: 'ui-drawer',
  template: `
    <div
      class="ui-drawer"
      [style.--width]="(collapsed ? collapsedWidth : width) + 'rem'"
      [ngClass]="drawerStyleClass"
      [style]="drawerStyle"
      [style.transition]="transition"
      [ngClass]="{
        'drawer-collapsed': collapsed,
        'drawer-expanded': !collapsed
      }"
      [style.width.rem]="collapsed ? collapsedWidth : width"
    >
      <div
        class="drawer-wrapper"
        [style.transition]="transition"
        [ngClass]="{
          'drawer-collapsed': collapsed,
          'drawer-expanded': !collapsed
        }"
        [style.width.rem]="collapsed ? collapsedWidth : width"
      >
        <div class="ui-drawer-header">
          <div id="header-wrapper">
            <ng-content select="[header]"></ng-content>
          </div>
        </div>
        <div class="ui-drawer-content">
          <div id="content-wrapper">
            <ng-content select="[content]"></ng-content>
            <div class="divider-wrapper">
              <div class="divider"></div>
            </div>
          </div>
        </div>
        <div class="ui-drawer-footer">
          <ng-scrollbar class="drawer-scroller">
            <div id="footer-wrapper">
              <ng-content select="[footer]"></ng-content>
            </div>
          </ng-scrollbar>
        </div>
      </div>
    </div>
    <div
      class="drawer-content-wrapper"
      [style.left]="
        (collapsed ? collapsedWidth + _offset : width + _offset) + 'rem'
      "
    >
      <ng-scrollbar class="content-scroller">
        <ng-content select="[body-content]"></ng-content>
      </ng-scrollbar>
    </div>
  `,
  styleUrls: ['./drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerComponent extends EventTarget implements AfterViewInit {
  constructor(
    public reference: ElementRef,
    private changeReference: ChangeDetectorRef
  ) {
    super();
  }

  _collapsed = true;
  _offset = 1;
  @Input() drawerStyleClass!: string;
  @Input() drawerStyle!: string;
  @Input() width = 14;
  @Input() collapsedWidth = 5;
  @Input() transition = 'width 0.6s cubic-bezier(0.165, 1, 0.165, 1)';

  @ContentChildren(BaseComponent, {
    descendants: true,
  })
  items!: QueryList<BaseComponent>;
  _drawerItems: Array<BaseComponent> = [];
  subs: Subscription = new Subscription();

  ngAfterViewInit(): void {
    this._drawerItems = [...this.items];

    console.log(this.items);

    for (const item of this._drawerItems) {
      item.setStyle('span', 'opacity', this._collapsed ? '0' : '1');
      item.setStyle(
        '#baseComponent',
        'width',
        this._collapsed ? '30% ' : '90%'
      );
    }

    this.subs.add(
      this.items.changes
        .pipe(
          tap((items: QueryList<BaseComponent>) => {
            for (const item of items) {
              item.setStyle('span', 'opacity', this._collapsed ? '0' : '1');
              item.setStyle(
                '#baseComponent',
                'width',
                this._collapsed ? '30% ' : '90%'
              );
            }
            this._drawerItems = items.toArray();
          })
        )
        .subscribe()
    );
  }

  @HostListener('drawertoggle', ['$event'])
  onToggle(event: DrawerEvent) {
    this.collapsed = event.detail.collapsed;
  }

  public get collapsed() {
    return this._collapsed;
  }

  public set collapsed(value: boolean) {
    this._collapsed = value;

    if (this.items) {
      for (const item of this._drawerItems) {
        item.setStyle('span', 'opacity', this._collapsed ? '0' : '1');
        if (
          (
            item.elementReference.nativeElement as HTMLElement
          ).parentElement?.id.includes('footer-wrapper')
        ) {
          this._collapsed
            ? item.setStyle('self, button', 'width', '27.5%')
            : item.setStyle('self, button', 'width', '90%');
        } else {
          item.setStyle(
            'self, button',
            'width',
            this._collapsed ? '60%' : '90%'
          );
        }
      }
    }
  }
}

@NgModule({
  imports: [CommonModule, NgScrollbarModule],
  exports: [DrawerComponent],
  declarations: [DrawerComponent],
})
export class DrawerModule {}
