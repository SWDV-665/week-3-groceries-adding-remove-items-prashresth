import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';
import * as uuid from 'uuid';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = 'Groceries List';

  items = [
    {id: uuid.v4(), name: 'Bread', quantity: 4, price: 2.49},
    {id: uuid.v4(), name: 'Eggs', quantity: 2, price: 3.49},
    {id: uuid.v4(), name: 'Cheese', quantity: 1, price: 4.99},
    {id: uuid.v4(), name: 'Milk', quantity: 2, price: 1.99}
  ];

  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController) {

  }

  async deleteItem(item, index) {
    // another way to do it
    // this.items = this.items.filter(i => i.id !== item.id)
    this.items.splice(index, 1)
    const toast = this.toastCtrl.create({
      message: `Item: ${item.name} removed from the list.`,
      duration: 3000,
      cssClass: "toast-danger"
    });
    await toast.present();
  }

  async addItem() {
    const prompt = this.alertCtrl.create({
      title: 'Add Item',
      message: "Fill out the form below to add a grocery item",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
        {
          name: 'quantity',
          placeholder: 'Quantity'
        },
        {
          name: 'price',
          placeholder: 'Price'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            const toast = this.toastCtrl.create({
              message: `It's ok, add an item some other time...`,
              duration: 3000,
              cssClass: 'toast-primary'
            });
            toast.present();
          }
        },
        {
          text: 'Add',
          handler: item => {
            item.id = uuid.v4()
            this.items.push(item)
            const toast = this.toastCtrl.create({
              message: `Item: ${item.name} added to the list.`,
              duration: 3000,
              cssClass: 'toast-success'
            });
            toast.present();
          }
        }
      ]
    });
    await prompt.present();
  }

  async editItem(item, index, slidingItem: ItemSliding) {
    const prompt = this.alertCtrl.create({
      title: 'Edit Item',
      message: "Fill out the form below to edit the grocery item",
      inputs: [
        {
          name: 'name',
          value: `${item.name}`
        },
        {
          name: 'quantity',
          value: `${item.quantity}`
        },
        {
          name: 'price',
          value: `${item.price}`
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            slidingItem.close()
            const toast = this.toastCtrl.create({
              message: `It's ok, edit the item some other time...`,
              duration: 3000,
              cssClass: 'toast-primary'
            });
            toast.present();
          }
        },
        {
          text: 'Save',
          handler: item => {
            slidingItem.close()
            let itemToEdit = this.items[index]
            itemToEdit.name = item.name;
            itemToEdit.quantity = item.quantity;
            itemToEdit.price = item.price;
            const toast = this.toastCtrl.create({
              message: `Item updated successfully.`,
              duration: 3000,
              cssClass: 'toast-primary'
            });
            toast.present();
          }
        }
      ]
    });
    await prompt.present();
  }
}
