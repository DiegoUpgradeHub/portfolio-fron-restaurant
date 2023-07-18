import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CrmRoutingModule } from './crm-routing.module';

import { TranslateModule } from '@ngx-translate/core';

//Components
import { CrmComponent } from './crm.component';
import { ProductsComponent } from './products/products.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { DeleteProductComponent } from './products/delete-product/delete-product.component';
import { CreateProductComponent } from './products/create-product/create-product.component';

@NgModule({
  declarations: [
    CrmComponent,
    ProductsComponent,
    EditProductComponent,
    DeleteProductComponent,
    CreateProductComponent
  ],
  exports: [
    CrmComponent,
    ProductsComponent,
    EditProductComponent,
    DeleteProductComponent,
    CreateProductComponent
  ],
  imports: [
    CommonModule,
    CrmRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class CrmModule { }
