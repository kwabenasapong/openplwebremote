import { Component, OnInit } from '@angular/core';

import { OpenLPService } from '../../openlp.service';
import { PageTitleService } from '../../page-title.service';

@Component({
  selector: 'openlp-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss'],
  providers: [OpenLPService]
})

export class SlidesComponent implements OnInit {
  slides = null;

  constructor(private pageTitleService: PageTitleService, private openlpService: OpenLPService) {
    pageTitleService.changePageTitle('Slides');
    openlpService.stateChanged$.subscribe(item => this.getSlides());
  }

  ngOnInit() {
    this.getSlides();
  }

  onSlideSelected(id) {
    this.openlpService.setSlide(id).subscribe();
  }

  getSlides() {
    this.openlpService.getItemSlides().subscribe(slides => this.slides = slides);
  }
}
