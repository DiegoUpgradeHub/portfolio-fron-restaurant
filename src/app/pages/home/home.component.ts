import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { AppComponent } from 'src/app/app.component';

import { Product } from 'src/app/core/models/product';
import { ProductsService } from '../../core/services/products.service';
import { AuthService } from '../../core/services/auth.service';

import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  productsList: Product[] = [];
  currentUser: any = {};

  protected readonly clearSubscriptions$ = new Subject();

  constructor(
    private actRoute: ActivatedRoute,
    public appComponent: AppComponent,
    public router: Router,
    public productsService: ProductsService,
    public authService: AuthService,
    public productService: ProductsService,
    public translateService: TranslateService
  ){}

  ngOnInit(): void {
    //Obtener datos de los productos
    this.requestProducts();

    // //Obtener datos del usuario
    let id = localStorage.getItem('_id')
    if (id !== null) {
      this.authService.getUserProfile(id).subscribe(res => {
        this.currentUser = res;
      })
      console.log('User Id: ' + id)
    } else {
      console.log('No user log in')
    }

    //i18n
    this.detectBrowserLanguage();
  }

  public ngOnDestroy() {
    this.clearSubscriptions$.complete();
  }

  requestProducts() {
    return this.productsService.getProducts().pipe(takeUntil(this.clearSubscriptions$),).subscribe((data)=> {
      this.productsList = data
    })
  }

  //Funciones para in18
  setEnglish(){
    this.appComponent.setAppLanguageEnglish();
  }
  setSpanish(){
    this.appComponent.setAppLanguageSpanish();
  }
  detectBrowserLanguage(){
    const browserLang = this.translateService.getBrowserLang();
    if (browserLang === 'es') {}
  }

}


