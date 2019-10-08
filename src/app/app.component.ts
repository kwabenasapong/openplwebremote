import { Component, OnInit } from '@angular/core';
import { State } from './responses';
import { OpenLPService } from './openlp.service';
import { MatSlideToggleChange, MatDialog } from '@angular/material';
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  fastSwitching = false;
  state = new State();
  showLogin = false;

  constructor(private openlpService: OpenLPService, private dialog: MatDialog) {
    openlpService.stateChanged$.subscribe(item => this.state = item);
  }

  ngOnInit(): void {
    this.openlpService.retrieveSystemInformation().subscribe(res => this.showLogin = res.login_required);
  }

  login() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLogin = false;
        this.openlpService.setAuthToken(result.token);
      }
    });
  }

  nextItem() {
    this.openlpService.nextItem().subscribe();
  }

  previousItem() {
    this.openlpService.previousItem().subscribe();
  }

  nextSlide() {
    this.openlpService.nextSlide().subscribe();
  }

  previousSlide() {
    this.openlpService.previousSlide().subscribe();
  }

  blankDisplay() {
    this.openlpService.blankDisplay().subscribe();
  }

  themeDisplay() {
    this.openlpService.themeDisplay().subscribe();
  }

  desktopDisplay() {
    this.openlpService.desktopDisplay().subscribe();
  }

  showDisplay() {
    this.openlpService.showDisplay().subscribe();
  }

  sliderChanged(event: MatSlideToggleChange) {
    this.fastSwitching = event.checked;
  }

}
