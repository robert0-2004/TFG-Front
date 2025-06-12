import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { authGuard } from './guards/auth.guard';
import { TerrenosComponent } from './components/terrenos/terrenos.component';
import { TerrenoFormComponent } from './components/terreno-form/terreno-form.component';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { AdminTerrenosView } from './components/admin-terrenos-view/admin-terrenos-view.component';
import { SubirAnalisis } from './components/subir-analisis/subir-analisis.component';
import { AnalisisUsuario } from './components/analisis-usuario/analisis-usuario.component';


export const routes: Routes = [
    {
        path: 'home',
        pathMatch: 'full',
        redirectTo: '/'
    },

    {
        path: 'login',
        component: AuthComponent
    },
    {
        path: 'users/create',
        component: UserFormComponent,
        canActivate: [authGuard]
    },
    {
        path: 'users/terrenos',
        component: TerrenosComponent,
        canActivate: [authGuard],
    },
    {
        path: 'create/terreno',
        component: TerrenoFormComponent,
        canActivate: [authGuard]
    },
    {
        path: 'terreno/page/:page',
        component: TerrenosComponent,
    },
    {
        path: 'terreno/edit/:id',
        component: TerrenoFormComponent,
        canActivate: [authGuard]
    },

    {
        path: "admin",
        component: AdminViewComponent,
        canActivate: [authGuard]
    },
    {
        path: 'users/admin/page/:page',
        component: AdminViewComponent,
        canActivate: [authGuard]
    },
    {
        path: 'user/edit/:id',
        component: UserFormComponent,
        canActivate: [authGuard]
    },
    {
        path: 'user/terrenos/:id',
        component: AdminTerrenosView,
        canActivate: [authGuard]
    },
    {
        path: 'user/terrenos/:id/page/:page',
        component: AdminTerrenosView,
        canActivate: [authGuard]
    },
    {
        path: 'subir-analisis/:userId',
        component: SubirAnalisis,
        canActivate: [authGuard]
    },
      {
        path: 'analisis',
        component: AnalisisUsuario,
        canActivate: [authGuard]
    },
];