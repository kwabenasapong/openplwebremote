import { Component, OnInit } from '@angular/core';


import { OpenLPService } from '../../openlp.service';

@Component({
selector: 'openlp-remote-slides',
templateUrl: './slides.component.html',
styleUrls: ['./slides.component.scss'],
providers: [OpenLPService]
})

export class OpenLPSlidesComponent implements OnInit {
  slides = null;
  ngOnInit() {
    this.getSlides();
  }

  onSlideSelected(item) {
    this.openlpService.setSlide(item).subscribe(res => console.log(res));
  }

  getSlides() {
    this.openlpService.getItemSlides().subscribe(slides => this.slides = slides);
  }

  constructor(private openlpService: OpenLPService) {
    openlpService.stateChanged$.subscribe(item => this.getSlides());
  }
}
