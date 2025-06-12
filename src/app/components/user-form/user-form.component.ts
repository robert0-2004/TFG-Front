import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { UserService } from '../../services/user.service'; // Importa el servicio
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule,RouterModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  user: User;
  errors: any = {};

    users: User[] = [];

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private sharingData: SharingDataService,
    private userService: UserService // Inyecta el servicio
  ) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.sharingData.errorsUserFormEventEmitter.subscribe(errors => this.errors = errors);

    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');
      if (id > 0) {
        // Carga el usuario desde el backend
        this.userService.getUserById(id).subscribe({
          next: (user) => {
            this.user = user;
          },
          error: () => {
            this.user = new User();
          }
        });
      } else {
        this.user = new User();
      }
    });

  }

onSubmit(userForm: NgForm): void {
  if (this.user.id > 0) {
    // Actualizar usuario
    this.userService.update(this.user).subscribe({
      next: (userUpdated) => {
        Swal.fire({
          title: "Usuario actualizado",
          text: "Usuario actualizado con éxito",
          icon: "success"
        });
        this.router.navigate(['/admin']); // Redirige a admin
      },
      error: (err) => {
        if (err.status == 400) {
          this.errors = err.error;
        }
      }
    });
  } else {
    // Crear usuario
    this.userService.create(this.user).subscribe({
      next: (userNew) => {
        Swal.fire({
          title: "Usuario creado",
          text: "Usuario creado con éxito",
          icon: "success"
        });
        this.router.navigate(['/login']); // Redirige a login
      },
      error: (err) => {
        if (err.status == 400) {
          this.errors = err.error;
        }
      }
    });
  }
  userForm.reset();
  userForm.resetForm();
}

  onClear(userForm: NgForm): void {
    this.user = new User();
    userForm.reset();
    userForm.resetForm();
  }
}