import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OwnerConsultService } from '../services/owner-consult.service';
import { Owner } from '../models/owner';
import { RegistrationService } from '../services/registration.service';
import { MessageService } from 'primeng/api';
import { NotificationService } from '../services/notifications.service';

interface Type {
  name: string;
  code: string;
}

interface Stratum {
  name: string;
  code: number;
}

interface Property {
  name: string;
  code: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [MessageService, NotificationService]
})
export class MainComponent implements OnInit{

  errorMessage: string | null = null;
  title = 'requerimiento29-front';
  types: Type[] | undefined;
  selectedType: Type | undefined;
  stratum: Stratum[] | undefined;
  property: Property[] | undefined;
  document: string = '';
  owner: Owner[] = [];
  first: number = 0;
  rows: number = 10;
  //Form for the owner and one property
  discountForm = this.fb.group({
    document_type: ['', Validators.required],
    document: ['', [Validators.required, Validators.maxLength(15)]],
    first_name: ['', [Validators.required, Validators.maxLength(15)]],
    last_name: ['', [Validators.required, Validators.maxLength(15)]],
    over_60: ['', Validators.required],
    head_of_household: ['', Validators.required],
    unenployed: ['', Validators.required],
    propertyType: ['', Validators.required],
    city: ['', [Validators.required, Validators.maxLength(20)]],
    stratum: ['', Validators.required],
    address: ['', [Validators.required, Validators.maxLength(30)]],
    tax: ['', [Validators.required, Validators.max(90909090909), Validators.min(2)]]
  });

  constructor(private messageService: MessageService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private ownerConsultService: OwnerConsultService,
    private registrationService: RegistrationService) { }
  
  ngOnInit() {
    // Select types
    this.types = [
        { name: 'CC', code: 'CC' },
        { name: 'CE', code: 'CE' },
        { name: 'Pasaporte', code: 'Pasaporte' },
        { name: 'VR', code: 'VR' },
        { name: 'RCN', code: 'RCN' },
        { name: 'TI', code: 'TI' }
    ];

    this.stratum = [
      { name: '1', code: 1 },
      { name: '2', code: 2 },
      { name: '3', code: 3 },
      { name: '4', code: 4 },
      { name: '5', code: 5 },
      { name: '6', code: 6 }
    ];

    this.property = [
      { name: 'Residencial', code: 'Residencial' },
      { name: 'No residencial', code: 'No residencial' }
    ];
  }

  getOwnerData() {
    if (this.document) {
      this.ownerConsultService.getOwnerData(this.document)
      .subscribe({
        next: (data) => {
          this.owner = data;
          if (data.length === 0) {
            this.notificationService.showWarn(`El propietario con documento ${this.document} no existe.`);
          }
        },
        error: (error) => {
          this.notificationService.showError(error);
        }
      });
    } else {
      this.notificationService.showError('No se ha ingresado un documento de identidad');
    }
  }

  saveOwner() {
    if (this.discountForm.valid) {
      const formValue = this.discountForm.value;
      // Create a new object that structures the data as you want it
      const formattedData = {
        document_type: formValue.document_type,
        document: formValue.document,
        first_name: formValue.first_name,
        last_name: formValue.last_name,
        over_60: formValue.over_60,
        head_of_household: formValue.head_of_household,
        unenployed: formValue.unenployed,
        // Access the ownerProperties group directly
        ownerProperties: [{
          propertyType: formValue.propertyType,
          city: formValue.city,
          stratum: formValue.stratum,
          address: formValue.address,
          tax: formValue.tax
        }]
      };
      this.registrationService.registerOwnerData(formattedData).subscribe({
        next: (response) => {
          this.notificationService.showSuccess('Registro completado exitosamente');
        },
        error: (error) => {
          this.notificationService.showError(error);
        }
      });
    } else {
      this.notificationService.showWarn('El formulario no es válido');
    }
  }
}
