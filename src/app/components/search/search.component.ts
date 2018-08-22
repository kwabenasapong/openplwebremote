import { Component, OnInit } from '@angular/core';
import { OpenLPService } from '../../openlp.service';
import { PluginDescription } from '../../responses';

@Component({
selector: 'openlp-remote-search',
templateUrl: './search.component.html',
styleUrls: ['./search.component.scss'],
providers: [OpenLPService]
})


export class OpenLPSearchComponent implements OnInit {

  public searchPlugins: PluginDescription[] = [];
  public searchText = null;
  public searchResults = null;
  public selectedPlugin: string = "songs";
  public currentPlugin: string;

  constructor(private openlpService: OpenLPService) {}

  onSubmit() {
    this.currentPlugin = this.selectedPlugin;
    this.currentPlugin = "songs";
    this.openlpService.search(this.currentPlugin, this.searchText).subscribe(items => this.searchResults = items);
  }

  sendLive(id) {
    this.openlpService.sendItemLive(this.currentPlugin, id).subscribe(res => console.log(res));
  }

  addToService(id) {
    this.openlpService.addItemToService(this.currentPlugin, id).subscribe(res => console.log(res));
  }

  ngOnInit() {
    this.openlpService.getSearchablePlugins().subscribe(items => this.searchPlugins = items);
  }
}