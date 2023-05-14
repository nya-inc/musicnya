import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { DrawerComponent } from './drawer/drawer.component';
import { FooterComponent } from './footer/footer.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/reducers/app.reducer';
import * as AppActions from '../store/actions/app.actions';
import { Observable, Subscription } from 'rxjs';
import * as fromLayout from '../store/reducers/layout.reducer';
import { LayoutState } from '../store/reducers/layout.reducer';
import * as LayoutActions from '../store/actions/layout.actions';

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
export class AppComponent implements OnInit, OnDestroy {
  drawerOpen$: Observable<boolean>;
  width!: number;
  subs: Subscription = new Subscription();
  title = 'musicnya';

  constructor(private store: Store<AppState & LayoutState>) {
    this.drawerOpen$ = this.store.pipe(select(fromLayout.getDrawerOpen));
  }

  ngOnInit(): void {
    this.store.dispatch(AppActions.initApp());
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  toggleDrawer(event: boolean): void {
    this.store.dispatch(
      event ? LayoutActions.closeDrawer() : LayoutActions.openDrawer()
    );
  }
}
