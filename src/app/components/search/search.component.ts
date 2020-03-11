import { Component, OnInit } from '@angular/core';

import { OpenLPService } from '../../openlp.service';
import { PageTitleService } from '../../page-title.service';
import { PluginDescription } from '../../responses';

@Component({
  selector: 'openlp-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [OpenLPService]
})
export class SearchComponent implements OnInit {
  public searchPlugins: PluginDescription[] = [];
  public searchText = null;
  public searchResults = null;
  public selectedPlugin = 'songs';
  public currentPlugin: string;

  constructor(private pageTitleService: PageTitleService, private openlpService: OpenLPService) {
    pageTitleService.changePageTitle('Search');
  }

  onSubmit() {
    this.currentPlugin = this.selectedPlugin;
    this.openlpService.search(this.currentPlugin, this.searchText).subscribe(items => this.searchResults = items);
  }

  sendLive(id) {
    this.openlpService.sendItemLive(this.currentPlugin, id).subscribe(res => {});
  }

  addToService(id) {
    this.openlpService.addItemToService(this.currentPlugin, id).subscribe(res => {});
  }

  ngOnInit() {
    this.openlpService.getSearchablePlugins().subscribe(items => this.searchPlugins = items);
  }
}
