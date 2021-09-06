import { Component } from '@angular/core';

import { OpenLPService } from '../../openlp.service';
import { PageTitleService } from '../../page-title.service';
import { SlideListItem } from './slide-list/slide-list.component';

@Component({
  selector: 'openlp-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss'],
})

export class SlidesComponent {
  constructor(protected pageTitleService: PageTitleService, protected openlpService: OpenLPService) {
    pageTitleService.changePageTitle('Slides');
  }

  onSlideSelected(item: SlideListItem) {
    this.openlpService.setSlide(item.index).subscribe();
  }
}
