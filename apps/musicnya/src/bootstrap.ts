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
  ],
  // eslint-disable-next-line unicorn/prefer-top-level-await
}).catch((error) => console.error(error));
