import { Component, OnInit } from '@angular/core';
import { OpenLPService } from './openlp.service';

@Component({
selector: 'openlp-remote-search',
template: `
<h3>Search</h3>
<form>
<label>Search for:</label>
<mat-select [(ngModel)]="selectedPlugin" name="selectedPlugin">
  <mat-option *ngFor="let plugin of searchPlugins" name="searchPlugins" [value]="plugin.id">
    {{plugin.name}}
  </mat-option>
</mat-select>
<br>
<mat-form-field>
  <input matInput [(ngModel)]="searchText" name="searchText" placeholder="Search Text"></mat-form-field>
  <br>
<button mat-raised-button color="warn" (click)="onSubmit()">Search</button>
</form>
<div *ngIf="searchResults">
  <h3>Search Results:</h3>
  <table>
    <tr *ngFor="let item of searchResults">
      <td>{{item[1]}}</td>
      <td><button md-button color="primary" (click)="addToService(item[0])">Add</button></td>
      <td><button md-button color="primary" (click)="sendLive(item[0])">Send Live</button></td>
    </tr>
  </table>
</div>
`,
providers: [OpenLPService]
})


export class OpenLPSearchComponent implements OnInit {

  public searchPlugins: OpenLPPlugin[] = null;
  public searchText = null;
  public searchResults = null;
  public selectedPlugin: string;
  public currentPlugin: string;

  constructor(private openlpService: OpenLPService) {}

  onSubmit() {
    this.currentPlugin = this.selectedPlugin;
  //  this.openlpService.search(this.currentPlugin, this.searchText).then(items => this.searchResults = items);
  }

  sendLive(id) {
    this.openlpService.sendItemLive(this.currentPlugin, id);
  }

  addToService(id) {
    this.openlpService.addItemToService(this.currentPlugin, id);
  }

  ngOnInit() {
    this.getSearchablePlugins();
  }

  getSearchablePlugins() {
    // this.openlpService.getSearchablePlugins().then(items => {
    //   this.searchPlugins = [];
    //   for (var i = items.length - 1; i >= 0; i--) {
    //     this.searchPlugins.push({id: items[i][0], name: items[i][1]})
    //   }
    // });
  }
}

interface OpenLPPlugin {
  id: string;
  name: string;
}
