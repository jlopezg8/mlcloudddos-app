import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';
import { CaptureModel } from 'src/app/modules/captures/models/capture.model';

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
    map(captures => captures.map<CaptureModel>((capture, index) => ({
      number: index + 1,
      id: capture.id ?? '',
      name: capture.filePath,
      timestamp: new Date(capture.timestamp),
    }))),
  );

  capturesTableColumns: (keyof CaptureModel)[] = ['number', 'name', 'timestamp'];

  constructor(
    private captures: CapturesService,
    private snackBar: MatSnackBar,
  ) { }

  downloadCapture(captureId: string) {
    this.isDownloadingCapture = true;
    this.captures
        .downloadCapture(captureId)
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
          .uploadCapture(file)
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
