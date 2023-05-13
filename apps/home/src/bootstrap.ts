import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { HomeComponent } from './app/home/home.component';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrapApplication(HomeComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' })
    ),
  ],
});
