import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registrar-usuarios',
    loadChildren: () => import('./components/registrar-usuarios/registrar-usuarios.module').then( m => m.RegistrarUsuariosPageModule)
  },
  {
    path: 'recuperar-password',
    loadChildren: () => import('./components/recuperar-password/recuperar-password.module').then( m => m.RecuperarPasswordPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./components/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'cuenta-desabilitada',
    loadChildren: () => import('./components/cuenta-desabilitada/cuenta-desabilitada.module').then( m => m.CuentaDesabilitadaPageModule)
  },  {
    path: 'codigo',
    loadChildren: () => import('./components/codigo/codigo.module').then( m => m.CodigoPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
