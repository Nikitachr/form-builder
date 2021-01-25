import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as clientActions from 'src/app/store/actions/actions';
import { User } from 'src/app/shared/models/user.model';
import { AuthResponse } from 'src/app/shared/models/authResponse.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable()
export class Effects {

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {
  }

  onLogin$ = createEffect(() => this.actions$.pipe(
    ofType(clientActions.ActionTypes.Login),
    map((action: any) => action.payload),
    switchMap((action: User) => this.authService.login(action).pipe(
      map(((res: AuthResponse) => new clientActions.LoginSuccessAction(res.accessToken))),
      catchError(_ => of(new clientActions.RegistrationAction(action)))
    ))
  ));

  onRegistration$ = createEffect(() => this.actions$.pipe(
    ofType(clientActions.ActionTypes.Registration),
    map((action: any) => action.payload),
    switchMap((action: User) => this.authService.register(action).pipe(
      map(((res: AuthResponse) => new clientActions.RegistrationSuccessAction(res.accessToken)))
    ))
  ));

  onSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(clientActions.ActionTypes.LoginSuccess || clientActions.ActionTypes.RegistrationSuccess),
    tap((action: any) => localStorage.setItem('token', action.payload))
  ), { dispatch: false });
}
