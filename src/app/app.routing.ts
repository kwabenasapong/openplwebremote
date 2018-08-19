import { ModuleWithProviders, NgModule }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { OpenLPSearchComponent } from './search.component';
import { OpenLPAlertComponent } from './alert.component';
import { OpenLPSlidesComponent } from './slides.component';
import { OpenLPServiceComponent } from './service.component';

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
// {
// path: 'alerts',
// component: OpenLPAlertComponent
// },
// {
// path: 'search',
// component: OpenLPSearchComponent
// }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}