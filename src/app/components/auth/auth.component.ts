import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-auth',
  imports: [FormsModule,RouterLink],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent  {
  user: User = new User();

  users: User[] = [];
  
  constructor(private userService: UserService,
    private router: Router) { }





  onSubmit() {
    console.log(this.user.email);
    if (!this.user.email || !this.user.password) {
      Swal.fire(
        'Error de validación',
        'Email y password requeridos',
        'error'
      );
      return;
    }

    // Llamar al servicio para autenticar
    this.userService.login({ email: this.user.email, password: this.user.password }).subscribe({
      next: (response) => {
        Swal.fire(
          'Login exitoso',
          'Bienvenido ' + response.user.name,
          'success'
        ).then(() => {
          // Redirigir a /home después de cerrar el modal
          this.router.navigateByUrl('/home');
        });
      },
      error: (error) => {
        Swal.fire(
          'Error',
          'Credenciales incorrectas',
          'error'
        );
      }
    });
  }

  openModal() {
    setTimeout(() => {
      const modal = new (window as any).bootstrap.Modal(document.getElementById('loginModal'));
      modal.show();
    }, 100);
  }

  closeModal() {
    this.router.navigate(['/home']); // Redirige a Home al cerrar
  }


}
