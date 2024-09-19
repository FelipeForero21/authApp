import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { AuthGuard } from './guards/auth.guard'; // Si tienes un guard para protección de rutas

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: UserListComponent,
    canActivate: [AuthGuard] // Protege la ruta si es necesario
  },
  // Agrega aquí otras rutas según tus necesidades
  { path: '**', redirectTo: '/login' } // Redirige a login en caso de rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
