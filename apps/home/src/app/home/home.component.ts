import {
  Component,
  ChangeDetectionStrategy,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadingComponent, MediaTileListComponent } from '@nyan-inc/ui';
import { DragScrollModule } from 'ngx-drag-scroll';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    HeadingComponent,
    MediaTileListComponent,
    DragScrollModule,
  ],
  selector: 'musicnya-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  _clickEnabled = true;
  _positionX = 0;

  constructor(private router: Router) {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this._positionX = event.clientX;
    //stops chrome autofocusing the clicked element (even when dragging)
    event.stopPropagation();
    return false;
  }

  @HostListener('mousemove', ['$event'])
  onDragStart(event: MouseEvent) {
    const distanceX = event.clientX - this._positionX;
    if (event.buttons === 1 && Math.abs(distanceX) > 12) {
      this.disableClick();
    }
  }

  @HostListener('mouseup', ['$event'])
  onDragEnd() {
    this.enableClick();
  }

  disableClick() {
    this._clickEnabled = false;
  }

  enableClick() {
    this._clickEnabled = true;
  }
}
