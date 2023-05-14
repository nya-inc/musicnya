/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable import/no-unresolved */
import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';

export const appRoutes: Route[] = [
  {
    path: 'test2',
    loadChildren: () =>
      loadRemoteModule('test2', './Routes').then((m) => m.remoteRoutes),
  },
  {
    path: '',
    loadChildren: () =>
      loadRemoteModule('home', './Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'search',
    loadChildren: () =>
      loadRemoteModule('search', './Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'test',
    loadChildren: () =>
      loadRemoteModule('test', './Module').then((m) => m.RemoteEntryModule),
  },
];
