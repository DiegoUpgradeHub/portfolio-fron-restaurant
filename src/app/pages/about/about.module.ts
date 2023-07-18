import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AboutComponent
  ],
  exports: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class AboutModule { }
