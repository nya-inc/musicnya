import {
  AfterViewInit,
  ChangeDetectionStrategy,
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
  NyaButtonModule,
} from '@nyan-inc/ui';

@Component({
  selector: 'musicnya-drawer',
  standalone: true,
  imports: [CommonModule, DrawerModule, AlbumTileModule, NyaButtonModule],
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerComponent extends EventTarget implements AfterViewInit {
  constructor() {
    super();
  }

  @ViewChild(ParentDrawer) parentDrawer!: ParentDrawer;

  @Input() width?: number;
  collapsed?: boolean;

  ngAfterViewInit(): void {
    this.collapsed = this.parentDrawer.collapsed;
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
  }
}
