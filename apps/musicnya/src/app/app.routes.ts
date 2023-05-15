/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable import/no-unresolved */
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('home/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'search',
    loadChildren: () => import('search/Routes').then((m) => m.remoteRoutes),
  },
];
