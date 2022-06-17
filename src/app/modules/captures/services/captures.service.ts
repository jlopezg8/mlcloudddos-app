import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { Capture } from 'src/app/api/captures/models';
import { CaptureControllerService } from 'src/app/api/captures/services';

@Injectable()
export class CapturesService {

  captures$ = new BehaviorSubject<Capture[]>([]);

  constructor(
    private captureController: CaptureControllerService,
  ) {
    this.updateCaptures$();
  }

  private updateCaptures$() {
    this.getCaptures()
        .subscribe(captures => {
          this.captures$.next(captures);
        });
  }

  upload(capture: Blob) {
    return this.captureController
      .upload({body: { file: capture }})
      .pipe(
        catchError(err => {
          console.error(err);
          throw err;
        }),
        tap(() => this.updateCaptures$()),
      );
  }

  getCaptures() {
    return this.captureController.listCaptures();
  }

  download(captureFilename: string) {
    return this.captureController
      .downloadCapture({ filename: captureFilename });
  }

}
