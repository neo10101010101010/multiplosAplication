import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', 
    redirectTo: 'multiplos', 
    pathMatch: 'full' 
  },
  {
    path: 'multiplos', 
    loadChildren: () => import('./multiplos/multiplos.module').then(m => m.MultiplosPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
