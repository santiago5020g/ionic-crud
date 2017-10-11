import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductEditPage } from './product-edit';

@NgModule({
  declarations: [
    ProductEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductEditPage),
  ],
})
export class ProductEditPageModule {}
