import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InspectionsComponent } from './views/inspections/inspections.component';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  {
    path:'', component: LoginComponent
  },
  {
    path:'login', component: LoginComponent
  },
  {
    path:'inspections', component: InspectionsComponent, 
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
