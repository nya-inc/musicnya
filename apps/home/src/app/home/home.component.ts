import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadingComponent } from '@nyan-inc/ui';

@Component({
  standalone: true,
  imports: [CommonModule, HeadingComponent],
  selector: 'musicnya-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
