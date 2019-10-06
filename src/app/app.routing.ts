import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ServiceComponent } from './components/service/service.component';
import { AlertComponent } from './components/alert/alert.component';
import { SearchComponent } from './components/search/search.component';
import { SlidesComponent } from './components/slides/slides.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/service',
    pathMatch: 'full'
  },
  {
    path: 'service',
    component: ServiceComponent
  },
  {
    path: 'slides',
    component: SlidesComponent
  },
  {
    path: 'alerts',
    component: AlertComponent
  },
  {
    path: 'search',
    component: SearchComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
