import { setRemoteDefinitions } from '@nx/angular/mf';

import('./bootstrap').catch((err) => console.error(err));

void fetch('/assets/module-federation.manifest.json')
  .then((result) => result.json())
  .then((definitions: Record<string, string>) =>
    setRemoteDefinitions(definitions)
  )
  // eslint-disable-next-line unicorn/prefer-top-level-await
  .then(() => import('./bootstrap').catch((error) => console.error(error)));
