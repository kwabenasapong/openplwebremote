import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { OpenLPService } from '../../../openlp.service';
import { ServiceItem } from '../../../responses';

@Component({
  selector: 'openlp-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss'],
})

export class ServiceListComponent implements OnInit, OnDestroy {
  items: ServiceItem[] = [];
  _subscription: Subscription;

  @Output() itemSelected = new EventEmitter<ServiceItem>();

  ngOnInit() {
    this.fetchServiceItems();
  }

  onItemSelected(item: ServiceItem) {
    this.itemSelected.emit(item);
  }

  fetchServiceItems() {
    this.openlpService.getServiceItems().subscribe(items => this.items = items);
  }

  constructor(private openlpService: OpenLPService) {
    this._subscription = openlpService.stateChanged$.subscribe(state => {
      this.fetchServiceItems();
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}

