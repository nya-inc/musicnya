import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./home/entry.routes').then((m) => m.remoteRoutes),
  },
];
