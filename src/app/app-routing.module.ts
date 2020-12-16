import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './guard/auth-guard.service';


export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
      path: 'home' , 
      component: HomeComponent, 
      canActivate:[AuthGuardService]
  },
  {
    path: 'login' , 
    component: LoginComponent
  },


  // não colocar rotas abaixo desta
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  }

];


@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
