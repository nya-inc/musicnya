import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DrawerComponent } from './drawer/drawer.component';
import { FooterComponent } from './footer/footer.component';
import { NgScrollbarModule } from 'ngx-scrollbar';

@Component({
  standalone: true,
  imports: [
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
