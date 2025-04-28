import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MultiplosPageRoutingModule } from './multiplos-routing.module';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { MultiplosPage } from './multiplos.page';

// Define las rutas para este módulo (solo una ruta principal)
const routes: Routes = [
  { path: '', component: MultiplosPage }
];

// Decorador que define el módulo de la página de múltiplos
@NgModule({
  imports: [
    CommonModule, // Módulo con directivas y pipes comunes de Angular
    FormsModule, // Permite el uso de formularios y ngModel
    IonicModule, // Componentes de Ionic
    MultiplosPageRoutingModule, // Módulo de rutas específico para esta página
    RouterLink, // Permite el uso de enlaces de router
    RouterModule.forChild(routes) // Configura las rutas hijas para este módulo
  ],
  declarations: [MultiplosPage], // Declara el componente principal de la página
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Permite el uso de elementos personalizados
})
export class MultiplosPageModule {}
