import { Component } from '@angular/core';

import { OpenLPService } from '../../../openlp.service';

@Component({
  selector: 'openlp-search-options',
  templateUrl: './search-options.component.html',
  styleUrls: ['./search-options.component.scss'],
  providers: [OpenLPService]
})
export class SearchOptionsComponent {
  public selectedPlugin: string;
  public searchOptions: Array<string>;
  public selectedSearchOption: string;
  public searchOptionsTitle: String = '';

  constructor(private openlpService: OpenLPService) {}

  // Used to display search-options for certain plugins
  onPluginChange(plugin) {
    this.selectedPlugin = plugin;
    if (this.selectedPlugin === 'bibles') {
      this.searchOptionsTitle = 'Bible version:';
      this.getSearchOptions();
    }
  }

  getSearchOptions() {
    this.openlpService.getSearchOptions(this.selectedPlugin).subscribe(res => {
      if (this.selectedPlugin === 'bibles') {
        this.searchOptions = res['bibles'];
        this.selectedSearchOption = res['primary'];
      }
    });
  }

  setSearchOption(option) {
    this.openlpService.setSearchOption(this.selectedPlugin, option.value).subscribe(res => {});
    this.selectedSearchOption = option.value;
  }
}
