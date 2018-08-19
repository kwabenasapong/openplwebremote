import { Component } from '@angular/core';
import { State } from './state';
import { OpenLPService } from './openlp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  state: State = new State();

  constructor(private openlpService: OpenLPService) {
    openlpService.stateChanged$.subscribe(item => this.state = item);
    openlpService.getServiceItems().subscribe(result => {
      console.log(result);
    });
  }
  /*
  nextItem() {
  	this.openlpService.nextItem();
  }

  previousItem() {
  	this.openlpService.previousItem();
  }

  nextSlide() {
  	this.openlpService.nextSlide();
  }

  previousSlide() {
  	this.openlpService.previousSlide();
  }

  blankDisplay() {
  	this.openlpService.blankDisplay();
  }

  themeDisplay() {
  	this.openlpService.themeDisplay();
  }

  desktopDisplay() {
  	this.openlpService.desktopDisplay();
  }

  showDisplay() {
  	this.openlpService.showDisplay();
  }
  */

}
