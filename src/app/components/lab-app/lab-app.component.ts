import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { User } from '../../models/user';
import {  Router, RouterModule, RouterOutlet } from '@angular/router';

import { Carousel } from 'bootstrap';
import { Terreno } from '../../models/terreno';

@Component({
  selector: 'lab-app',
  imports: [NavbarComponent, RouterOutlet,RouterModule],
  templateUrl: './lab-app.component.html',
  styleUrl: './lab-app.component.css'
})
export class LabAppComponent implements OnInit, AfterViewInit {

  terreno: Terreno[] = [];
  users: User[] = [];

  private interval: any;

  paginator: any = {};


  constructor(
    public router: Router,) { }


  ngOnInit(): void {
  }
  //Este método se asegura de que el DOM se haya cargado completamente antes de que intentemos acceder al carrusel.
  ngAfterViewInit(): void {
    // Espera a que el componente y la vista estén completamente cargados
    const carouselElement = document.getElementById('carouselExampleFade');

    if (carouselElement) {
      const carouselInstance = new Carousel(carouselElement); // Inicializa el carrusel, importar boostrap para entender el Carousel que es nativo de boostrap

      this.interval = setInterval(() => {
        carouselInstance.next(); // Pasa a la siguiente imagen
      }, 5000);
    }
  }

  ngOnDestroy(): void {
    // Detiene el intervalo cuando el componente se destruye
    if (this.interval) {
      clearInterval(this.interval);
    }
  }


 
}



