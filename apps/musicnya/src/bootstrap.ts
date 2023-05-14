import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
} from '@angular/router';
import { appRoutes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromApp from './store/reducers/app.reducer';
import * as fromLayout from './store/reducers/layout.reducer';
import { AppEffects } from './store/effects/app.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      appRoutes,
      withEnabledBlockingInitialNavigation(),
      withHashLocation()
    ),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(
      NgScrollbarModule.withConfig({
        visibility: 'hover',
        appearance: 'compact',
        trackClass: 'track-margin',
      })
    ),
    provideStore(
      { app: fromApp.appReducer },
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: true,
          strictActionWithinNgZone: true,
          strictActionTypeUniqueness: true,
        },
      }
    ),
    provideState(fromLayout.LAYOUT_FEATURE_KEY, fromLayout.layoutReducer),
    provideEffects(AppEffects),
    provideStoreDevtools({ maxAge: 25 }),
  ],
  // eslint-disable-next-line unicorn/prefer-top-level-await
}).catch((error) => console.error(error));
