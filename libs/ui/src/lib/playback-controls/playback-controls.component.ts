import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseButtonComponent, BaseButtonModule } from '@nyan-inc/core';
import { SliderModule } from '../slider/slider.component';

@Component({
  selector: 'ui-playback-controls',
  template: ` <div id="track-wrapper">
      <ui-slider></ui-slider>
    </div>
    <div id="controls-wrapper">
      <base-button
        #button
        [tabIndex]="0"
        class="album-tile ui-drawer-item base-button-rounded"
        icon="shuffle"
        id="shuffle-button"
      >
      </base-button
      ><base-button
        #button
        [tabIndex]="0"
        class="album-tile ui-drawer-item base-button-rounded"
        icon="skip_previous"
        id="previous-button"
      >
      </base-button
      ><base-button
        #button
        [tabIndex]="0"
        class="album-tile ui-drawer-item base-button-rounded"
        icon="play_circle"
        id="play-button"
        id="play-button"
      >
      </base-button>
      <base-button
        #button
        [tabIndex]="0"
        class="album-tile ui-drawer-item base-button-rounded"
        icon="skip_next"
        id="next-button"
      >
      </base-button>
      <base-button
        #button
        [tabIndex]="0"
        class="album-tile ui-drawer-item base-button-rounded"
        icon="repeat"
        id="repeat-button"
      >
      </base-button>
    </div>`,
  styleUrls: ['./playback-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaybackControlsComponent extends BaseButtonComponent {}

@Component({
  selector: 'ui-miscellaneous-controls',
  template: `<div id="misc-controls-wrapper">
    <base-button
      #button
      [tabIndex]="0"
      class="album-tile ui-drawer-item base-button-rounded"
      icon="format_quote"
      id="lyrics-button"
    >
    </base-button>
    <base-button
      #button
      [tabIndex]="0"
      class="album-tile ui-drawer-item base-button-rounded"
      icon="queue_music"
      id="queue-button"
    >
    </base-button>
    <base-button
      #button
      [tabIndex]="0"
      class="album-tile ui-drawer-item base-button-rounded"
      icon="volume_down"
      id="volume-button"
    >
    </base-button>
    <div id="volume-track-wrapper">
      <ui-slider [width]="5" [max]="20"></ui-slider>
    </div>
  </div>`,
  styleUrls: ['./playback-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiscellaneousControlsComponent extends BaseButtonComponent {}

@NgModule({
  imports: [CommonModule, BaseButtonModule, SliderModule],
  exports: [PlaybackControlsComponent, MiscellaneousControlsComponent],
  declarations: [PlaybackControlsComponent, MiscellaneousControlsComponent],
})
export class PlaybackControlsModule {}
