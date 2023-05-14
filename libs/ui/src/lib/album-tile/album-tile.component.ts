import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewChildren,
  ElementRef,
  QueryList,
  HostBinding,
  ChangeDetectorRef,
  NgModule,
} from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent, JoinPipeModule } from '@nyan-inc/core';

@Component({
  selector: 'ui-album-tile-large',
  template: `
    <base-button
      #button
      [tabIndex]="0"
      class="album-tile-large"
      [ngClass]="{ 'hover-pointer': hoverUnderline }"
    >
      <img
        id="artwork"
        alt="{{ type }} art"
        [style.width.rem]="tileSize"
        [style.height.rem]="tileSize"
        [src]="source"
      />
      <div
        id="album-info-large"
        #span
        *ngIf="mediaTitle || showArtists"
        [style.display]="showArtists ? 'flex' : 'block'"
        [ngClass]="{ 'hover-underline': hoverUnderline }"
      >
        <ng-container *ngIf="mediaTitle">
          <span #span id="title">{{ mediaTitle }}</span></ng-container
        >
        <ng-container *ngIf="showArtists">
          <span #span id="artists">{{ artists | join }}</span>
        </ng-container>
      </div>
    </base-button>
  `,
  styleUrls: ['./album-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: BaseComponent, useExisting: AlbumTileLargeComponent }],
})
export class AlbumTileLargeComponent extends BaseComponent {
  @Input() type!: string;
  @Input() source!: string;
  @Input() mediaTitle!: string;
  @Input() artists!: string[];
  @Input() tileSize = 2;
  @Input() showArtists = this.artists ? true : false;
  @Input() hoverUnderline = false;
  @ViewChildren('span', { read: ElementRef })
  spanElements!: QueryList<ElementRef>;
  @HostBinding('class') class = 'outline-offset';

  @ViewChildren('button', { read: ElementRef })
  buttonElements!: QueryList<ElementRef>;

  constructor(
    protected changeDetector: ChangeDetectorRef,
    elementReference: ElementRef,
    router: Router
  ) {
    super(changeDetector, elementReference, router);
  }

  override toggleButtonWidth(): void {
    console.log(this.buttonElements);
    for (const item of this.buttonElements) {
      if ((item.nativeElement as HTMLElement).style.width === '') {
        (item.nativeElement as HTMLElement).style.width = 'auto';
      }
      (item.nativeElement as HTMLElement).style.width =
        (item.nativeElement as HTMLElement).style.width == 'auto'
          ? '90%'
          : 'auto';
    }
  }
}

@Component({
  selector: 'ui-album-tile',
  template: `
    <base-button
      #button
      [tabIndex]="0"
      class="album-tile ui-drawer-item"
      [ngClass]=""
    >
      <img
        id="artwork"
        alt="{{ type }} art"
        [style.max-width.rem]="tileSize"
        [style.max-height.rem]="tileSize"
        [src]="source"
      />
      <div
        id="album-info"
        #span
        *ngIf="mediaTitle || showArtists"
        [style.display]="showArtists ? 'flex' : 'block'"
        [ngClass]="{ 'hover-underline': hoverUnderline }"
      >
        <ng-container *ngIf="mediaTitle">
          <span #span id="title">{{ mediaTitle }}</span></ng-container
        >
        <ng-container *ngIf="showArtists">
          <span #span id="artists">{{ artists | join }}</span>
        </ng-container>
      </div>
    </base-button>
  `,
  styleUrls: ['./album-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: BaseComponent, useExisting: AlbumTileComponent }],
})
export class AlbumTileComponent extends BaseComponent {
  @Input() type!: string;
  @Input() source!: string;
  @Input() mediaTitle!: string;
  @Input() artists!: string[];
  @Input() tileSize = 2;
  @Input() showArtists = this.artists ? true : false;
  @Input() hoverUnderline = false;
  @ViewChildren('span', { read: ElementRef })
  spanElements!: QueryList<ElementRef>;

  @ViewChildren('button', { read: ElementRef })
  buttonElements!: QueryList<ElementRef>;

  constructor(
    protected changeDetector: ChangeDetectorRef,
    elementReference: ElementRef,
    router: Router
  ) {
    super(changeDetector, elementReference, router);
  }

  override toggleButtonWidth(): void {
    console.log(this.buttonElements);
    for (const item of this.buttonElements) {
      if ((item.nativeElement as HTMLElement).style.width === '') {
        (item.nativeElement as HTMLElement).style.width = 'auto';
      }
      (item.nativeElement as HTMLElement).style.width =
        (item.nativeElement as HTMLElement).style.width == 'auto'
          ? '90%'
          : 'auto';
    }
  }
}

@NgModule({
  imports: [CommonModule, JoinPipeModule],
  exports: [AlbumTileComponent, AlbumTileLargeComponent],
  declarations: [AlbumTileComponent, AlbumTileLargeComponent],
})
export class AlbumTileModule {}
