import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { CaptureControllerService } from 'src/app/api/captures/services';

@Injectable()
export class CapturesService {

  filenames$ = new BehaviorSubject(['']);

  constructor(
    private captureController: CaptureControllerService,
  ) {
    this.updateFilenames$();
  }

  private updateFilenames$() {
    this.getFilenames()
        .subscribe(filenames => this.filenames$.next(filenames));
  }

  upload(capture: Blob) {
    return this.captureController
      .upload({body: { file: capture }})
      .pipe(
        tap(() => this.updateFilenames$()),
      );
  }

  getFilenames() {
    return this.captureController.listCaptures();
  }

  download(captureFilename: string) {
    return this.captureController
      .downloadCapture({ filename: captureFilename });
  }

}
