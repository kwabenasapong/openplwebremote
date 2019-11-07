import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OpenLPService } from '../../openlp.service';
import { PageTitleService } from '../../page-title.service';
import { ServiceItem } from '../../responses';

@Component({
  selector: 'openlp-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
  providers: [OpenLPService]
})

export class ServiceComponent implements OnInit {
  items: ServiceItem[] = [];

  ngOnInit() {
    this.getServiceItems();
  }

  onItemSelected(item) {
    this.openlpService.setServiceItem(item).subscribe(res => {});
    this.router.navigate(['slides']);
  }

  getServiceItems() {
    this.openlpService.getServiceItems().subscribe(items => this.items = items);
  }

  constructor(private pageTitleService: PageTitleService, private openlpService: OpenLPService,
              private router: Router) {
    pageTitleService.changePageTitle('Service');
    openlpService.stateChanged$.subscribe(item => this.getServiceItems());
  }

  getIcon(item: ServiceItem): string {
    if (item.plugin === 'songs') {
      return 'queue_music';
    } else if (item.plugin === 'images') {
      return 'image';
    } else if (item.plugin === 'bibles') {
      return 'book';
    } else if (item.plugin === 'media') {
      return 'movie';
    } else if (item.plugin === 'custom') {
      return 'description';
    } else if (item.plugin === 'presentations') {
      return 'slideshow';
    }
    return 'crop_square';
  }

}
