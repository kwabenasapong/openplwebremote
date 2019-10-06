import { Component } from '@angular/core';


import { OpenLPService } from '../../openlp.service';

@Component({
  selector: 'openlp-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  providers: [OpenLPService]
})

export class AlertComponent {

  public alert: string;

  constructor(private openlpService: OpenLPService) { }

  onSubmit() {
    console.log('submitted: ', this.alert);
    this.openlpService.showAlert(this.alert).subscribe(res => console.log(res));
    this.alert = '';
  }
}
