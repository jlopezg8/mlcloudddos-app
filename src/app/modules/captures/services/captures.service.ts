import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { Capture } from 'src/app/api/captures/models';
import { CaptureControllerService } from 'src/app/api/captures/services';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class CapturesService {

  captures$ = new BehaviorSubject<Capture[]>([]);

  constructor(
    private auth: AuthService,
    private captureController: CaptureControllerService,
  ) {
    this.subscribeToAuthChanges();
  }

  private subscribeToAuthChanges() {
    this.auth
        .isAuthenticated$
        .subscribe(isAuthenticated => {
          if (isAuthenticated) {
            this.updateCaptures$();
          } else {
            this.captures$.next([]);
          }
        });
  }

  private updateCaptures$() {
    this.getUserCaptures()
        .subscribe(captures => {
          this.captures$.next(captures);
        });
  }

  uploadCapture(capture: Blob) {
    return this.captureController
      .upload({ body: { file: capture }})
      .pipe(
        catchError(err => {
          console.error(err);
          throw err;
        }),
        tap(() => this.updateCaptures$()),
      );
  }

  getUserCaptures() {
    return this.captureController.listMine();
  }

  downloadCapture(captureId: string) {
    return this.captureController.download({ id: captureId });
  }

}
