import { Component } from '@angular/core';


import { OpenLPService } from '../../openlp.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'openlp-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  providers: [OpenLPService]
})

export class AlertComponent {

  public alert: string;

  constructor(private openlpService: OpenLPService, private snackBar: MatSnackBar) { }

  onSubmit() {
    this.openlpService.showAlert(this.alert).subscribe(res => this.snackBar.open('Alert submitted', '', {duration: 2000}));
  }
}
