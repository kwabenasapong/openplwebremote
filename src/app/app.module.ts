import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { MatButtonModule, MatButtonToggleModule } from '@angular/material';
import { MatCardModule, MatDialogModule, MatSnackBarModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

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
import { ThemesComponent } from './components/themes/themes.component';


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
    SlidesComponent,
    ThemesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
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
