import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';
import { CaptureModel } from 'src/app/modules/models/capture.model';

import { CapturesService } from '../../services/captures.service';

@Component({
  selector: 'app-captures',
  templateUrl: './captures.component.html',
  styleUrls: ['./captures.component.css']
})
export class CapturesComponent {

  isDownloadingCapture = false;
  isUploadingCapture = false;
  captures$ = this.captures.captures$.pipe(
    map(captures => captures.map(({ filepath, datetime }, index) => ({
      index: index + 1,
      filename: filepath,
      datetime: new Date(datetime),
    }))),
  );
  displayedColumns: (keyof CaptureModel)[] = ['index', 'filename', 'datetime'];

  constructor(
    private captures: CapturesService,
    private snackBar: MatSnackBar,
  ) { }

  downloadCapture(filename: string) {
    this.isDownloadingCapture = true;
    this.captures
        .download(filename)
        .subscribe(capture => {
          window.open(URL.createObjectURL(capture));
        })
        .add(() => this.isDownloadingCapture = false);
  }

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.isUploadingCapture = true;
      this.captures
          .upload(file)
          .subscribe({
            next: () => this.displayMessage('Captura subida'),
            error: () => this.displayMessage(
              'No se pudo subir la captura. Ponte en contacto con Soporte.'
            ),
          })
          .add(() => this.isUploadingCapture = false);
    }
  }

  displayMessage(message: string) {
    this.snackBar.open(message, 'X', { duration: 3000 });
  }

}
