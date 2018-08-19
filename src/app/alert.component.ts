import { Component } from '@angular/core';


import { OpenLPService } from './openlp.service';

@Component({
selector: 'openlp-remote-alert',
template: `
<h3>Send an Alert</h3>
<mat-form-field>
  <input matInput [(ngModel)]="alert" type="text" placeholder="Alert"></mat-form-field>
<div>
<button mat-raised-button color="warn" (click)="onSubmit()">Send</button>
</div>
`,
providers: [OpenLPService]
})

export class OpenLPAlertComponent {

  public alert: string;

  constructor(private openlpService: OpenLPService) { }

  onSubmit() {
    console.log('submitted: ', this.alert);
    this.openlpService.showAlert(this.alert);
    this.alert = '';
  }
}
