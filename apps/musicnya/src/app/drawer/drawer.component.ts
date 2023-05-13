import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
// eslint-disable-next-line import/no-unresolved
import {
  AlbumTileModule,
  DrawerComponent as ParentDrawer,
  DrawerModule,
} from '@nyan-inc/ui';
import { BaseButtonModule } from '@nyan-inc/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'musicnya-drawer',
  standalone: true,
  imports: [
    CommonModule,
    DrawerModule,
    AlbumTileModule,
    BaseButtonModule,
    RouterModule,
  ],
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerComponent extends EventTarget implements AfterViewInit {
  constructor(private changeReference: ChangeDetectorRef) {
    super();
  }

  @ViewChild(ParentDrawer) parentDrawer!: ParentDrawer;

  @Input() width?: number;
  collapsed?: boolean;

  ngAfterViewInit(): void {
    this.collapsed = this.parentDrawer.collapsed;
    this.changeReference.markForCheck();
  }

  toggle() {
    this.collapsed = !this.collapsed;
    const toggleEvent = new CustomEvent('drawertoggle', {
      bubbles: true,
      detail: { collapsed: this.collapsed },
    });
    (this.parentDrawer.reference.nativeElement as HTMLElement).dispatchEvent(
      toggleEvent
    );
    this.changeReference.markForCheck();
  }
}
