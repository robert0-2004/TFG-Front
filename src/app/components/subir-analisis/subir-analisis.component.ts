import { Component, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Analisis } from '../../models/analisis';
import { AnalisisService } from '../../services/analisis.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subir-analisis',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './subir-analisis.component.html',
  styleUrl: './subir-analisis.component.css'
})
// ...otros imports...
export class SubirAnalisis {
  userId!: number;
  analisis: Analisis = {
    fecha: '',
    resultado: '',
    tipo: '',
    user: { id: 0 }
  };
  n!: number ;
  p!: number;
  k!: number;
  ca!: number;
  mg!: number;
  enviado = false;

  constructor(private service: AnalisisService,
    private route: ActivatedRoute
  ) {
    this.userId = +this.route.snapshot.paramMap.get('userId')!;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;
    this.analisis.user = { id: this.userId };
    // Une los resultados en el formato que espera el backend
    console.log('Analisis enviado:', this.analisis);
    this.analisis.resultado = `N: ${this.n}%, P: ${this.p}%, K: ${this.k}%, Ca: ${this.ca}%, Mg: ${this.mg}%`;
    this.service.create(this.analisis).subscribe({
      next: () => {
        this.enviado = true;
        Swal.fire({
          icon: 'success',
          title: '¡Análisis subido!',
          text: 'El análisis se ha subido correctamente.'
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo subir el análisis. ¿Está el backend encendido?'
        });
      }
    });
    form.reset();
    form.resetForm();
  }

  onClear(analisisForm: NgForm): void {
    this.analisis = new Analisis();
    analisisForm.reset();
    analisisForm.resetForm();
  }
}
