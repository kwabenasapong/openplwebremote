import { ModuleWithProviders, NgModule }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { OpenLPServiceComponent } from './components/service/service.component';
import { OpenLPAlertComponent } from './components/alert/alert.component';
import { OpenLPSearchComponent } from './components/search/search.component';
import { OpenLPSlidesComponent } from './components/slides/slides.component';

const routes: Routes = [
{
path: '',
redirectTo: '/service',
pathMatch: 'full'
},
{
path: 'service',
component: OpenLPServiceComponent
},
{
path: 'slides',
component: OpenLPSlidesComponent
},
{
path: 'alerts',
component: OpenLPAlertComponent
},
{
path: 'search',
component: OpenLPSearchComponent
}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}