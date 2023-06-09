import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, tap } from 'rxjs';
import * as AppActions from '../actions/app.actions';

@Injectable({ providedIn: 'root' })
export class AppEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.initApp),
      switchMap(() => of(AppActions.loadAppSuccess({ app: [] }))),
      catchError((error: Error) => {
        tap(() => console.error(error));
        return of(AppActions.loadAppFailure({ error }));
      })
    )
  );
}
