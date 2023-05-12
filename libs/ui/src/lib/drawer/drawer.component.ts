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
import { UIButtonDirective } from '../directives/uibutton.directive';
import { map, Subscription, tap } from 'rxjs';
import { AlbumTileComponent } from '../album-tile/album-tile.component';
import { DrawerEvent } from '@nyan-inc/core';

@Component({
  selector: 'ui-drawer-item',
  template: `
    <button
      uiButton
      [tabIndex]="0"
      [ngClass]="itemStyleClass"
      [style]="itemStyle"
      class="ui-button-m"
      [style.transition]="transition"
    >
      <i class="material-symbols-rounded text-2xl">{{ icon }}</i>
      <span class="drawer-text">{{ text }}</span>
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

  constructor(private reference: ChangeDetectorRef) {}

  setClass(collapsed: boolean) {
    this.itemStyleClass = collapsed ? 'collapsed' : 'expanded';
    this.reference.markForCheck();
  }
}

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

  @ContentChildren(DrawerItemComponent, { descendants: true })
  items!: QueryList<DrawerItemComponent>;
  @ContentChildren(AlbumTileComponent, { descendants: true })
  mediaItems!: QueryList<AlbumTileComponent>;
  _drawerItems: Array<DrawerItemComponent | AlbumTileComponent> = [];
  subs: Subscription = new Subscription();

  ngAfterViewInit(): void {
    this._drawerItems = [...this.items, ...this.mediaItems];

    for (const item of this._drawerItems) {
      item.setClass(this.collapsed);
    }

    this.subs.add(
      this.items.changes
        .pipe(
          map((items: QueryList<DrawerItemComponent>) => {
            for (const item of items) {
              item.setClass(this.collapsed);
            }
            return items.toArray();
          }),
          tap(
            (items: DrawerItemComponent[]) =>
              (this._drawerItems = [
                ...this._drawerItems,
                ...items.filter((item) => !items.includes(item)),
              ])
          ),
          tap((value) => console.log(value))
        )
        .subscribe()
    );

    this.mediaItems.changes
      .pipe(
        map((items: QueryList<AlbumTileComponent>) => {
          for (const item of items) {
            item.setClass(this.collapsed);
          }
          return items.toArray();
        }),
        tap(
          (items: AlbumTileComponent[]) =>
            (this._drawerItems = [
              ...this._drawerItems,
              ...items.filter((item) => !items.includes(item)),
            ])
        )
      )
      .subscribe();
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
        item.setClass(this.collapsed);
      }
    }
  }
}

@NgModule({
  imports: [CommonModule, NgScrollbarModule, UIButtonDirective],
  exports: [DrawerComponent, DrawerItemComponent],
  declarations: [DrawerComponent, DrawerItemComponent],
})
export class DrawerModule {}
