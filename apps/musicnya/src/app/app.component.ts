import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { DrawerComponent } from './drawer/drawer.component';
import { FooterComponent } from './footer/footer.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { UIButtonDirective } from '@nyan-inc/ui';

export type DrawerEvent = { detail: { collapsed: boolean; width: number } };

@Component({
  standalone: true,
  imports: [
    NxWelcomeComponent,
    RouterModule,
    CommonModule,
    DrawerComponent,
    FooterComponent,
    NgScrollbarModule,
  ],
  selector: 'musicnya-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  width!: number;
  title = 'musicnya';
}
