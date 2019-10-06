import { Component } from '@angular/core';
import { State } from './responses';
import { OpenLPService } from './openlp.service';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  fastSwitching = false;
  state: State = new State();

  constructor(private openlpService: OpenLPService) {
    openlpService.stateChanged$.subscribe(item => this.state = item);
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
