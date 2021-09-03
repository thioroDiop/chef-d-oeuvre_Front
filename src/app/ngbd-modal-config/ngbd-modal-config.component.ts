import { Component, OnInit  } from '@angular/core';



@Component({
  selector: 'app-ngbd-modal-config',
  templateUrl: './ngbd-modal-config.component.html',
  styleUrls: ['./ngbd-modal-config.component.css'],

})
export class NgbdModalConfigComponent implements OnInit {

  constructor() {}

  ngOnInit() {}

  displayStyle = "none";

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
}
