import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OwnerConsultService } from '../services/owner-consult.service';
import { AllOwnerData } from '../models/allOwnerData';
import { ValidationService } from '../services/validation.service';
import { NotificationService } from '../services/notifications.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-consults',
  templateUrl: './consults.component.html',
  styleUrls: ['./consults.component.css'],
  providers: [MessageService, NotificationService]
})
export class ConsultsComponent implements OnInit{

  constructor(private messageService: MessageService,
    private notificationService: NotificationService,
    private http: HttpClient,
    private ownerConsultService: OwnerConsultService,
    private validationService: ValidationService) {}

  visible: boolean = false;
  document: string = '';
  idProperty: number = 0;
  errorMessage: string | null = null;
  moreOwner: AllOwnerData | undefined;

  ngOnInit(): void {

  }
  // Returns all the data of a owner 
  getMoreOwnerData() {
    if (this.document) {
      this.ownerConsultService.getMoreOwnerData(this.document)
      .subscribe({
        next: (data) => {
          this.moreOwner = data;
          if (data === null) {
            this.notificationService.showWarn(`El propietario con documento ${this.document} no existe.`);
          }
        },
        error: (error) => {
          console.error('Hubo un error al obtener los datos', error);
          this.notificationService.showError(error);
        }
      });
    } else {
      this.notificationService.showError('No se ha ingresado un documento de identidad');
    }
  }

  // Validates payment
  executeValidation(idProperty: number){
    this.messageService.clear('confirm');
    this.visible = false;
    this.validationService.validateOne(idProperty).subscribe({
      next: (response) => {
        const property = this.moreOwner!.properties.find(p => p.idProperty === idProperty);
        if (property) {
          property.status = 'Pagado';
        }
        this.notificationService.showSuccess('Pago validado exitosamente');
      },
      error: (error) => {
        this.notificationService.showError(error);
      }
    });
  }

  // Ask for confirmation
  showConfirm(idProperty: number) {
    if (!this.visible) {
      this.messageService.add({ key: 'confirm', sticky: true, severity: 'warn', summary: '¿Estás seguro que el usuario ha realizado el pago de su impuesto?', data: idProperty});
        this.visible = true;
    }
  }
    
  onReject() {
    this.messageService.clear('confirm');
    this.visible = false;
  }
}
