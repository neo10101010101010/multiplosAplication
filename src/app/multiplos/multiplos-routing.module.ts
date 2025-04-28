import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MultiplosPage } from './multiplos.page';

const routes: Routes = [
  {
    path: '',
    component: MultiplosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MultiplosPageRoutingModule {}
