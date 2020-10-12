import { Component, OnInit, ViewChild } from '@angular/core';
import Web3 from 'web3';
import KeylessSDK from '@inbloxme/keyless-transactions';
const KeylessWidget = new KeylessSDK.Widget({
  env: 'dev',
  rpcURL:'https://ropsten.infura.io/v3/b3a845111c5f4e3eaf646c79bcb4d4c0'
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  handleName: any;
  userAddress: any;
  rawTx: any;
  gasLimit: any;
  gasPrice: any;
  transactionHash: any;

  initKeylessWidget() {
    
    KeylessWidget.initLogin();

    // Listening to login success event.
    KeylessWidget.on(KeylessWidget.EVENTS.LOGIN_SUCCESS, (widgetData: any) => {
      if (widgetData.status) {
        const data = widgetData.data;        
        this.handleName = data.handleName;
        this.userAddress = data.publicAddress;
        console.log('handlename', this.handleName);
        console.log('userAddress',this.userAddress);        
      }
    });
  }

 async sendTransaction() {
   this.gasLimit = 30000;
   const web3 = new Web3(
    new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/b3a845111c5f4e3eaf646c79bcb4d4c0')
   );

   this.gasPrice = await web3.eth.getGasPrice();   
    this.rawTx = {
        to: '0xdd7040598244C108B54c5784C9475B7CA2dC04a6',
        value: '1000000000000000',
        gasLimit: this.gasLimit,
        gasPrice: this.gasPrice
    }
    KeylessWidget.initSendTransaction(this.rawTx);
    // Listening to transaction success event.
    KeylessWidget.on(
      KeylessWidget.EVENTS.TRANSACTION_SUCCESSFUL,
      (transactionData: any) => {
        if (transactionData.status) {
          this.transactionHash = transactionData.data.transactionHash;          
        }
      }
    );
  }

  async signTx() {
    this.gasLimit = 30000;
    const web3 = new Web3(
     new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/b3a845111c5f4e3eaf646c79bcb4d4c0')
    );
 
    this.gasPrice = await web3.eth.getGasPrice();   
     this.rawTx = {
         to: '0xdd7040598244C108B54c5784C9475B7CA2dC04a6',
         value: '1000000000000000',
         gasLimit: this.gasLimit,
         gasPrice: this.gasPrice
     }
    const signedTx = KeylessWidget.initSignTransaction(this.rawTx);
    console.log(signedTx);
  };
}