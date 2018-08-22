import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { OpenLPService } from '../../openlp.service';

@Component({
selector: 'openlp-remote-service',
templateUrl: './service.component.html',
styleUrls: ['./service.component.scss'],
providers: [OpenLPService]
})

export class OpenLPServiceComponent implements OnInit {
  items = [];
  ngOnInit() {
    this.getServiceItems();
  }

  onItemSelected(item) {
    this.openlpService.setServiceItem(item).subscribe(res => console.log(res));
    this.router.navigate(['slides']);
  }

  getServiceItems() {
    this.openlpService.getServiceItems().subscribe(items => this.items = items);
  }

  constructor(private openlpService: OpenLPService, private router: Router) {
    openlpService.stateChanged$.subscribe(item => this.getServiceItems());
  }

}
