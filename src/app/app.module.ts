import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { MatCardModule, MatDialogModule, MatSnackBarModule } from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


import { AppComponent } from './app.component';
import { PageTitleService } from './page-title.service';
import { OpenLPService } from './openlp.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { ServiceComponent } from './components/service/service.component';
import { AlertComponent } from './components/alert/alert.component';
import { SearchComponent } from './components/search/search.component';
import { SlidesComponent } from './components/slides/slides.component';
import { FormsModule } from '@angular/forms';
import { ChordViewComponent } from './components/chord-view/chord-view.component';
import { StageViewComponent } from './components/stage-view/stage-view.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { ChordProPipe } from './components/chord-view/chordpro.pipe';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    ChordViewComponent,
    StageViewComponent,
    MainViewComponent,
    ChordProPipe,
    LoginComponent,
    ServiceComponent,
    AlertComponent,
    SearchComponent,
    SlidesComponent
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
    MatButtonModule,
    MatInputModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [
    PageTitleService,
    OpenLPService,
    Title
  ],
  entryComponents: [
    LoginComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
