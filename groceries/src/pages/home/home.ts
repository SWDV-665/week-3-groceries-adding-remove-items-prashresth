import { Component } from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GroceriesServiceProvider } from "../../providers/groceries-service/groceries-service";
import { InputDialogServiceProvider } from "../../providers/input-dialog-service/input-dialog-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = 'Groceries List';

  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public groceryService: GroceriesServiceProvider,
              public inputDialogService: InputDialogServiceProvider,
              public modalController: ModalController) {

  }

  loadItems() {
    return this.groceryService.getAllItems();
  }

  async addItem() {
    await this.inputDialogService.showPrompt();
  }

  async editItem(item, index, itemSliding) {
    await this.inputDialogService.showPrompt(item, index, itemSliding);
  }

  async deleteItem(item, index) {
    this.groceryService.deleteItem(index);
    await this.inputDialogService.createDeleteToast(item);
  }
}
