import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
// eslint-disable-next-line import/no-unresolved
import { AlbumTileModule, DrawerModule, UIButtonDirective } from '@nyan-inc/ui';

@Component({
  selector: 'musicnya-drawer',
  standalone: true,
  imports: [CommonModule, DrawerModule, AlbumTileModule, UIButtonDirective],
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerComponent extends EventTarget {
  constructor(private reference: ElementRef) {
    super();
  }

  drawerCollapsed?: boolean;

  toggled(event: Event) {
    this.drawerCollapsed = (event as CustomEvent).detail as boolean;
    const toggleEvent = new CustomEvent('drawertoggle', {
      detail: this.drawerCollapsed,
    });
    (this.reference.nativeElement as HTMLElement).dispatchEvent(toggleEvent);
  }
}
