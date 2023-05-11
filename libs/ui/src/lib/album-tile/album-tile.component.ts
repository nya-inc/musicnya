import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIButtonDirective } from '../directives/uibutton.directive';
import { JoinPipeModule } from '@nyan-inc/core';

@Component({
  selector: 'ui-album-tile',
  template: `
    <button
      uiButton
      class="album-tile ui-drawer-item"
      [ngClass]="albumStyleClass"
      [ngClass]="{ 'hover-pointer': hoverUnderline }"
      [ngClass]="buttonStyleClass"
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
        *ngIf="title || showArtists"
        [style.display]="showArtists ? 'flex' : 'block'"
        [ngClass]="{ 'hover-underline': hoverUnderline }"
      >
        <span class="title" *ngIf="title">{{ title }}</span>
        <span class="artist" *ngIf="showArtists">{{ artists | join }}</span>
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
  @Input() buttonStyleClass!: string;
  @Input() albumStyleClass!: string;

  constructor(private reference: ChangeDetectorRef) {}

  setClass(collapsed: boolean) {
    this.albumStyleClass = collapsed ? 'collapsed' : 'expanded';
    this.reference.markForCheck();
  }
}

@NgModule({
  imports: [CommonModule, UIButtonDirective, JoinPipeModule],
  exports: [AlbumTileComponent],
  declarations: [AlbumTileComponent],
})
export class AlbumTileModule {}
