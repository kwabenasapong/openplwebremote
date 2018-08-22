import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { OpenLPService } from './openlp.service';

@Component({
selector: 'openlp-remote-service',
template: `
<h3>Service items:</h3>
<div>
  <mat-nav-list>
    <a mat-list-item *ngFor="let item of items;let counter = index;" (click)="onItemSelected(counter)"  [class.selected]="item.selected">
      <p mat-line>{{item.title}}<p>
    </a>
  </mat-nav-list>
</div>
`,
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
