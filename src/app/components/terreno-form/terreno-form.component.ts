import { Component, OnInit } from '@angular/core';
import { Terreno } from '../../models/terreno';
import { ActivatedRoute, Router,  } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { FormsModule, NgForm } from '@angular/forms';
import { TerrenosService } from '../../services/terrenos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-terreno-form',
  imports: [FormsModule],
  templateUrl: './terreno-form.component.html',
  styleUrl: './terreno-form.component.css'
})
export class TerrenoFormComponent implements OnInit {
  terreno: Terreno;
  errors: any = {};

  constructor(
    private route: ActivatedRoute,
    private sharingData: SharingDataService,
      private router: Router,
    private terrenosService: TerrenosService
  ) {
    this.terreno = new Terreno();
  }
  ngOnInit(): void {
    this.sharingData.errorsTerrenoFormEventEmitter.subscribe(errors => this.errors = errors);
    this.sharingData.selectTerrenoEventEmitter.subscribe(terreno => {
      if (terreno) {
        this.terreno = { ...terreno }; // Copia para evitar modificar la referencia original
      }
    });
  
    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');
  
      if (id > 0) {
        this.sharingData.findTerrenoByIdEventEmitter.emit(id);
      }
    });
  }
  
  onClear(terrenoForm: NgForm): void {
    this.terreno = new Terreno();
    terrenoForm.reset();
    terrenoForm.resetForm();
  }

  onSubmit(terrenoForm: NgForm): void {
    console.log(this.terreno);
    
    if (this.terreno.id > 0) {
      this.terrenosService.update(this.terreno).subscribe({
        next: (updatedTerreno) => {
          this.sharingData.updateTerrenosListEventEmitter.emit(updatedTerreno);
          Swal.fire({
            title: "Actualizado",
            text: "Terreno actualizado con éxito",
            icon: "success"
          }).then(() => {
            this.router.navigateByUrl('users/terrenos');
          });
        },
        error: (err) => {
          console.error("Error al actualizar el terreno:", err);
        }
      });
    } else {
      this.terrenosService.create(this.terreno).subscribe({
        next: (newTerreno) => {
          this.sharingData.newTerrenoEventEmitter.emit(newTerreno);
          Swal.fire({
            title: "Creado",
            text: "Terreno creado con éxito",
            icon: "success"
          }).then(() => {
            this.router.navigateByUrl('users/terrenos');
          });
        },
        error: (err) => {
          console.error("Error al crear el terreno:", err);
        }
      });
    }
    terrenoForm.reset();
  }
}

