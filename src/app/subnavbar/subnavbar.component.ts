import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { ValidationService } from '../services/validation.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-subnavbar',
  templateUrl: './subnavbar.component.html',
  styleUrls: ['./subnavbar.component.css'],
  providers: [MessageService]
})
export class SubnavbarComponent {
  items: MenuItem[] | undefined;
  visible: boolean = false;

  constructor(private messageService: MessageService,
    private validationService: ValidationService) {}

  ngOnInit() {
    this.items = [
      {label: 'Consultar', routerLink:'/administration'},
      {label: 'Solicitudes', routerLink:'/administration/requests'}
    ];
  }

  // Validates all deadline payment
  executeValidations(){
    this.messageService.clear('confirm');
    this.visible = false;
    this.validationService.validateAll().subscribe({
      next: (response) => {
        console.log('Registro completado', response);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  // Ask for confirmation
  showConfirm() {
    if (!this.visible) {
        this.messageService.add({ 
          key: 'confirm',
          sticky: true,
          severity: 'warn',
          summary: '¿Deseas verificar el pago de impuesto para todos los usuarios?',
          detail: 'Ten en cuenta que esto puede hacer que el sistema funcione lento'
        });
        this.visible = true;
    }
  }

  onReject() {
    this.messageService.clear('confirm');
    this.visible = false;
  }

}
