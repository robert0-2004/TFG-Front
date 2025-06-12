import { Component } from '@angular/core';
import { AnalisisService } from '../../services/analisis.service';
import { Analisis } from '../../models/analisis';
import { UserService } from '../../services/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-analisis-usuario',
  imports: [DatePipe],
  templateUrl: './analisis-usuario.component.html',
  styleUrl: './analisis-usuario.component.css'
})
export class AnalisisUsuario {
  analisis: Analisis[] = [];
  userId!: number;

  constructor(private analisisService: AnalisisService,
    private service: UserService) {}

  ngOnInit() {
    this.userId = this.service.getUserIdFromToken()!;
    if (this.userId) {
      this.analisisService.getByUser(this.userId).subscribe(data => {
        this.analisis = data;
      });
    }
  }
}
