import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth.guard'

const routes: Routes = [
  {
    path: ``, loadChildren: () =>
      import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: `home`, redirectTo: ``, pathMatch: `full`
  },
  {
    path: `about`, loadChildren: () =>
      import('./pages/about/about.module').then(m => m.AboutModule)
  },
  {
    path: `crm/:id`, loadChildren: () =>
      import('./pages/crm/crm.module').then(m => m.CrmModule),
      canActivate: [AuthGuard] //Con esto protegemos esta ruta
  },
  {
    path: `signin`, loadChildren: () =>
      import('./core/components/signin/signin.module').then(m => m.SigninModule)
  },
  {
    path: `signup`, loadChildren: () =>
      import('./core/components/signup/signup.module').then(m => m.SignupModule),
      canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
