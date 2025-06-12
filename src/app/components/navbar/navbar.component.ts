import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Terreno } from '../../models/terreno';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  @Input() terreno: Terreno[] = [];

  @Input() paginator = {};

  constructor(private userService: UserService,private router: Router){ }

  authenticated(): boolean {
    return this.userService.isAuthenticated();
  }
  
  isAdmin(): boolean{
    return this.userService.isAdmin();
  }

  logout(): void {
    this.userService.logout(); // Elimina el token de sessionStorage
    this.router.navigate(['/login']); // Redirige al login
  }

}
