import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UploadDownloadService } from '../services/upload-download.service';
import { NotificationService } from '../services/notifications.service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}


@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
  providers: [MessageService, NotificationService]
})
export class RequestsComponent {
  document: string = '';
  errorMessage: string | null = null;

  constructor(private messageService: MessageService,
    private notificationService: NotificationService,
  private uploadDownloadService: UploadDownloadService) {}

  onUpload(event: any) {
    let message = 'Archivo cargado exitosamente';
    if (event.originalEvent && event.originalEvent.body) {
      message = event.originalEvent.body.message || message;
    }
    this.notificationService.showWarn(message);
  }
  onUploadError(event: any) {
    this.notificationService.showError('Error al cargar el archivo');
  }

  downloadData() {
    this.uploadDownloadService.downloadOwnerData(this.document)
    .subscribe(blob => {
      if (blob instanceof Blob) {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        // Set the download attribute with a default file name
        a.download = this.document + '.txt';
        a.href = objectUrl;
        // Append the link to the body of the document
        document.body.appendChild(a);
        a.click();
        // Clean up and remove the link
        document.body.removeChild(a);
        URL.revokeObjectURL(objectUrl);
      } else {
        this.notificationService.showError('El archivo no está disponible para la descarga');
      }
    }, error => {
      this.notificationService.showError('Error en descarga');
    });
  }
}
