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
  
  nextItem() {
  	this.openlpService.nextItem().subscribe(res => console.log(res));
  }

  previousItem() {
  	this.openlpService.previousItem().subscribe(res => console.log(res));
  }

  nextSlide() {
  	this.openlpService.nextSlide().subscribe(res => console.log(res));
  }

  previousSlide() {
  	this.openlpService.previousSlide().subscribe(res => console.log(res));
  }

  blankDisplay() {
  	this.openlpService.blankDisplay().subscribe(res => console.log(res));
  }

  themeDisplay() {
  	this.openlpService.themeDisplay().subscribe(res => console.log(res));
  }

  desktopDisplay() {
  	this.openlpService.desktopDisplay().subscribe(res => console.log(res));
  }

  showDisplay() {
  	this.openlpService.showDisplay().subscribe(res => console.log(res));
  }

}
