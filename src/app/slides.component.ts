import { Component, OnInit } from '@angular/core';


import { OpenLPService } from './openlp.service';

@Component({
selector: 'openlp-remote-slides',
template: `
<h3>Slides:</h3>
<div>
  <mat-list>
    <mat-list-item *ngFor="let slide of slides; let counter = index;" style="white-space:pre-wrap;cursor: pointer;" (click)="onSlideSelected(counter)" [class.selected]="slide.selected">
      <span mat-list-avatar>{{ slide.tag }}</span>
      <p mat-line *ngFor="let line of slide.lines">
        {{line}}
      </p>
    </mat-list-item>
  </mat-list>
</div>
`,
providers: [OpenLPService]
})

export class OpenLPSlidesComponent implements OnInit {
  slides = null;
  ngOnInit() {
    this.getSlides();
  }

  onSlideSelected(item) {
    // this.openlpService.setSlide(item);
  }

  getSlides() {
    // this.openlpService.getItemSlides().then(slides=> {this.slides = slides;console.log(slides);});
  }

  constructor(private openlpService: OpenLPService) {
    openlpService.stateChanged$.subscribe(item => this.getSlides());
  }
}
