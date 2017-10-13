import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCoinPage } from './add-coin';

@NgModule({
  declarations: [
    AddCoinPage,
  ],
  imports: [
    IonicPageModule.forChild(AddCoinPage),
  ],
})
export class AddCoinPageModule {}
