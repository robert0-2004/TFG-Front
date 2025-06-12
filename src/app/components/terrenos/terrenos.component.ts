import { Component, OnInit } from '@angular/core';
import { Terreno } from '../../models/terreno';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { TerrenosService } from '../../services/terrenos.service';
import { PaginatorComponent } from '../paginator/paginator.component';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-terrenos',
  imports: [RouterLink, PaginatorComponent,FormsModule,
    FormsModule,RouterModule],
  templateUrl: './terrenos.component.html',
  styleUrl: './terrenos.component.css'
})
export class TerrenosComponent implements OnInit {

  title = 'Lista de Terrenos';
  
  pageUrl: string = '/terreno/page';

  terrenos: Terreno[] = [];

  paginator: any = {};

  searchTerm: string = '';

  page: number = 0;

  size: number = 5;

  userIdFromAdmin?: number;

  constructor(
    private service: TerrenosService,
    private sharingData: SharingDataService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) {
   const nav = this.router.getCurrentNavigation();
  if (nav?.extras.state) {
    this.terrenos = nav.extras.state['terreno'];
    this.paginator = nav.extras.state['paginator'];
    this.userIdFromAdmin = nav.extras.state['userId'];
  }
  }

ngOnInit(): void {
    if (this.userIdFromAdmin) {
      // Vista admin: muestra terrenos del usuario seleccionado
      this.service.getTerrenosByUserId(this.userIdFromAdmin).subscribe(terrenos => {
        this.terrenos = terrenos;
        this.paginator = {};
      });
    } else {
      // Vista normal: muestra terrenos del usuario autenticado
      this.service.findMyTerrenos().subscribe({
        next: terrenos => {
          this.terrenos = terrenos;
        },
        error: err => console.error("Error al obtener los terrenos del usuario:", err)
      });
      // Si quieres paginación para el usuario autenticado, aquí puedes llamar a tu paginación normal
      this.route.paramMap.subscribe(params => {
        const page = +(params.get('page') || '0');
        this.service.findMyTerrenosPageable(page).subscribe(pageable => {
          this.terrenos = pageable.content as Terreno[];
          this.paginator = pageable;
        });
      });
    }
  // Suscripciones a eventos (elimina, actualiza, etc)
  this.removeTerreno();
  this.updateTerreno();
  this.findTerrenoById();
}

  removeTerreno(): void {
    this.sharingData.idTerrenoEventEmitter.subscribe(id => {
      Swal.fire({
        title: "¿Seguro que quiere eliminar?",
        text: "¡Cuidado el terreno sera eliminado del sistema!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si"
      }).then((result) => {
        if (result.isConfirmed) {

          this.service.remove(id).subscribe(() => {
            this.terrenos = this.terrenos.filter(terreno => terreno.id != id);
            //replaceUrl evita que cambie la url pa que no lo vea el usuario
            this.router.navigate(['create/terrenos'], { replaceUrl: true }).then(() => {
              this.router.navigate(['/user/terrenos'], {
                state: {
                  terrenos: this.terrenos,
                  paginator: this.paginator
                }
              });
            });
          })


          Swal.fire({
            title: "Eliminado!",
            text: "Terreno eliminado con exito.",
            icon: "success"
          });
        }
      });
    });
  }


  onRemoveTerreno(id: number): void {
    this.sharingData.idTerrenoEventEmitter.emit(id);
  }


  findTerrenoById() {
    this.sharingData.findTerrenoByIdEventEmitter.subscribe(id => {
      const terreno = this.terrenos.find(t => t.id === id);
      this.sharingData.selectTerrenoEventEmitter.emit(terreno);
    });
  }
  

  updateTerreno() {
    this.sharingData.updateTerrenosListEventEmitter.subscribe((updatedTerreno: Terreno) => {
      this.terrenos = this.terrenos.map(t => (t.id === updatedTerreno.id) ? updatedTerreno : t);
      Swal.fire({
        title: "Actualizado",
        text: "Terreno actualizado en la lista",
        icon: "success"
      });
    });
  }


get filteredTerrenos(): Terreno[] {
  return this.terrenos.filter(terreno =>
    terreno.cultivo?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    terreno.superficie?.toString().includes(this.searchTerm)
  );
}
 loadTerreno(page: number = 0): void {
    this.page = page;
    this.service.getTerreno(this.page, this.size, this.searchTerm.trim()).subscribe(pageable => {
      this.terrenos = pageable.content as Terreno[];
      this.paginator = pageable;
    });
  }

    onSearchChange(): void {
    this.loadTerreno(0); // Al buscar, vuelve a la primera página
  }
   /**
   * Descargar el PDF
   * @param terrenoId ID del terreno
   */
   viewPdf(terrenoId: number): void {
    this.service.viewPdf(terrenoId);
  }
}
