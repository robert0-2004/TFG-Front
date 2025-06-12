import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { PaginatorComponent } from '../paginator/paginator.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-view',
  imports: [PaginatorComponent, RouterLink, FormsModule],
  templateUrl: './admin-view.component.html',
  styleUrl: './admin-view.component.css'
})
export class AdminViewComponent implements OnInit {
  title = 'Admin Panel';

  user: User[] = [];

  usuarios: User[] = [];

  allUsers: User[] = [];

  pageUrl: string = '/users/admin/page';

  paginator: any = {};

  searchTerm: string = '';

  page: number = 0;

  size: number = 5;

  constructor(
    private service: UserService,
    private sharingData: SharingDataService,
    private router: Router,
    private route: ActivatedRoute,

  ) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.usuarios = this.router.getCurrentNavigation()?.extras.state!['terreno'];
      this.paginator = this.router.getCurrentNavigation()?.extras.state!['paginator'];
    }
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const page = +(params.get('page') || '0');
      this.loadUsuarios(page);
    });
    this.removeUser();
  }


  onRemoveUser(id: number): void {
    this.sharingData.idUserEventEmitter.emit(id);
  }

  removeUser(): void {
    this.sharingData.idUserEventEmitter.subscribe(id => {
      Swal.fire({
        title: "Seguro que quiere eliminar?",
        text: "Cuidado el usuario sera eliminado del sistema!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si"
      }).then((result) => {
        if (result.isConfirmed) {

          this.service.remove(id).subscribe(() => {
            this.usuarios = this.usuarios.filter(user => user.id != id);
            //replaceUrl evita que cambie la url pa que no lo vea el usuario
            this.router.navigate(['/'], { replaceUrl: true }).then(() => {
              this.router.navigate(['/admin'], {
                state: {
                  terrenos: this.user,
                  paginator: this.paginator
                }
              });
            });
          })


          Swal.fire({
            title: "Eliminado!",
            text: "Usuario eliminado con exito.",
            icon: "success"
          });
        }
      });
    });
  }


  updateUser() {
    this.sharingData.updateUserListEventEmitter.subscribe((updatedUser: User) => {
      this.user = this.user.map(u => (u.id === updatedUser.id) ? updatedUser : u);
      Swal.fire({
        title: "Actualizado",
        text: "Usuario actualizado en la lista",
        icon: "success"
      });
    });
  }

  get filteredUser(): User[] {
    if (!this.searchTerm.trim()) return this.usuarios;
    return this.usuarios.filter(user =>
      user.name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.username?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.lastname?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  loadUsuarios(page: number = 0): void {
    this.page = page;
    this.service.getUsuarios(this.page, this.size, this.searchTerm.trim()).subscribe(pageable => {
      this.usuarios = pageable.content as User[];
      this.paginator = pageable;
    });
  }

  onSearchChange(): void {
    this.loadUsuarios(0); // Al buscar, vuelve a la primera página
  }

  verTerrenos(userId: number): void {
    this.router.navigate(['/user/terrenos', userId]);
  }
}