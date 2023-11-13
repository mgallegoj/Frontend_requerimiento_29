import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit{
  items: MenuItem[] | undefined;

  activeItem: MenuItem | undefined;

  ngOnInit() {
    this.items = [
      {label: 'INSCRIPCIÓN', routerLink:'/home'},
      {label: 'ADMINISTRACIÓN', routerLink:'/administration'},
    ];
    
    this.activeItem = this.items[0];
  }
}