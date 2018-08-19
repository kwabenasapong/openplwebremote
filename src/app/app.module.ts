import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';

import { AppComponent } from './app.component';
import { OpenLPService } from './openlp.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { OpenLPServiceComponent } from './service.component';
import { OpenLPAlertComponent } from './alert.component';
import { OpenLPSearchComponent } from './search.component';
import { OpenLPSlidesComponent } from './slides.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    OpenLPServiceComponent,
    OpenLPAlertComponent,
    OpenLPSearchComponent,
    OpenLPSlidesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatGridListModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [
    OpenLPService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
