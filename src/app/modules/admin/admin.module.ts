import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { HeaderComponent } from './shared/header/header.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CoursesComponent } from './courses/courses.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AdminLayoutComponent,
    HeaderComponent,
    CoursesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
