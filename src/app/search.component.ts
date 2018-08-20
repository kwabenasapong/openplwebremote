import { Component, OnInit } from '@angular/core';
import { OpenLPService } from './openlp.service';
import { PluginDescription } from './responses';

@Component({
selector: 'openlp-remote-search',
template: `
<h3>Search</h3>
<form>
<label>Search for:</label>
<mat-form-field>
<mat-select [(ngModel)]="selectedPlugin" name="selectedPlugin">
  <mat-option *ngFor="let plugin of searchPlugins" name="searchPlugins" [value]="plugin.key">
    {{plugin.name}}
  </mat-option>
</mat-select>
</mat-form-field>
<br>
<mat-form-field>
  <input matInput [(ngModel)]="searchText" name="searchText" placeholder="Search Text">
</mat-form-field>
  <br>
<button mat-raised-button color="warn" (click)="onSubmit()">Search</button>
</form>
<div *ngIf="searchResults">
  <h3>Search Results:</h3>
  <table>
    <tr *ngFor="let item of searchResults">
      <td>{{item[1]}}</td>
      <td><button mat-button color="primary" (click)="addToService(item[0])">Add</button></td>
      <td><button mat-button color="accent" (click)="sendLive(item[0])">Send Live</button></td>
    </tr>
  </table>
</div>
`,
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