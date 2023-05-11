import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinPipe } from '@nyan-inc/core';
import { UIButtonDirective } from '../directives/uibutton.directive';

@Component({
  selector: 'ui-album-tile',
  template: `
    <button
      uiButton
      class="album-tile ui-drawer-item"
      [ngClass]="{ 'hover-pointer': hoverUnderline }"
    >
      <img
        class="artwork"
        alt="{{ type }} art"
        [style.max-width.rem]="tileSize"
        [style.max-height.rem]="tileSize"
        [src]="source"
      />
      <div
        class="album-info"
        [style.display]="showArtists ? 'flex' : 'block'"
        [ngClass]="{ 'hover-underline': hoverUnderline }"
      >
        <span class="title">{{ title }}</span>
        <span class="artist" *ngIf="showArtists">{{ artists | joinPipe }}</span>
      </div>
    </button>
  `,
  styleUrls: ['./album-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumTileComponent {
  @Input() type!: string;
  @Input() source!: string;
  @Input() title!: string;
  @Input() artists!: string[];
  @Input() tileSize = 2;
  @Input() showArtists = this.artists ? true : false;
  @Input() hoverUnderline = false;

  sayHi() {
    console.log('hi');
  }
}

@NgModule({
  imports: [CommonModule, JoinPipe, UIButtonDirective],
  exports: [AlbumTileComponent],
  declarations: [AlbumTileComponent],
})
export class AlbumTileModule {}
