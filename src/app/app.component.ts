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
  handleName: any;
  userAddress: any;

  initKeylessWidget() {
    KeylessWidget.initLogin();

    // Listening to login success event.
    KeylessWidget.on(KeylessWidget.EVENTS.LOGIN_SUCCESS, (widgetData: any) => {
      if (widgetData.status) {
        const data = widgetData.data;        
        this.handleName = data.handleName;
        this.userAddress = data.publicAddress;
      }
    });
  }
}