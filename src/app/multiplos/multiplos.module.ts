import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MultiplosPageRoutingModule } from './multiplos-routing.module';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { MultiplosPage } from './multiplos.page';

const routes: Routes = [
  { path: '', component: MultiplosPage }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MultiplosPageRoutingModule,
    RouterLink,
    RouterModule.forChild(routes)
  ],
  declarations: [MultiplosPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class MultiplosPageModule {}
