import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublicModule } from './modules/public/public.module';
import { AdminAuthGuard } from './admin-auth.guard';
import { UserAuthGuard } from './user-auth.guard';

const routes: Routes = [
  {path:'admin', canMatch:[AdminAuthGuard], loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)}, //lazy loading
  {path:'user', canMatch:[UserAuthGuard], loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)}, //lazy loading
  { path: '', loadChildren: () => PublicModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
