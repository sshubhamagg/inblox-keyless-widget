import { Component, OnInit, ViewChild } from '@angular/core';

import KeylessSDK from '@inbloxme/keyless-transactions';
const KeylessWidget = new KeylessSDK.Widget();

declare let Web3: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  initKeylessWidget() {
    KeylessWidget.initLogin();
  }
}