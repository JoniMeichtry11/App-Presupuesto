import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualizarComponent } from './actualizar/actualizar.component';
import { CrearComponent } from './crear/crear.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'crear-presupuesto', component: CrearComponent
  },
  {
    path: 'actualizar-presupuesto/:id', component: ActualizarComponent
  },
  {
    path: '**', redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
