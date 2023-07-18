import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { AuthService } from 'src/app/core/services/auth.service';
import { ProductsService } from 'src/app/core/services/products.service';

import { Product } from 'src/app/core/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  productsList: Product[] = [];
  filteredList: Product[] = [];

  editForm!: FormGroup;

  thisProduct: any = {};

  searchBarValue: string = '';

  protected readonly clearSubscriptions$ = new Subject();

  constructor(
    public fb: FormBuilder,
    private productsService: ProductsService,
    public router: Router,
    public authService: AuthService,
    public actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.clearSubscriptions$.complete();
  }

  //Obtener todos los productos
  getProducts(): void{
    this.productsService.getProducts().pipe(takeUntil(this.clearSubscriptions$),).subscribe((data)=>{
      this.productsList = data;
      this.filteredList = data;
      console.log('Products list: ', this.productsList);
      console.log('filtered: ', this.filteredList);
    });
  }

  getThisProduct(product: any): void {
    console.log('getThisProduct');
    this.thisProduct = product;
    console.log('Product: ' + this.thisProduct);
  }

  //Editar el producto
  editProduct(id: string) {
    this.router.navigate(['/update-use/' + id]);
  }
  //Eliminar el producto
  deleteProduct(id: string) {
    this.router.navigate(['/delete-use/' + id]);
  }

  //Buscar un producto
  searchProduct(): void {
    if (this.searchBarValue.trim() === '') {
      // Si el valor del searchbar está vacío, mostrar todos los productos
      this.filteredList = this.productsList;
      console.log('Search Bar Value es ``')
    } else {
      // Filtrar la lista de productos basado en el valor del searchbar
      this.filteredList = this.productsList.filter(
        (product) =>
          product.name.toLowerCase().includes(this.searchBarValue.toLowerCase())
      );
      console.log('la lista filtrada no está filtrando')
    }
  }

  //Obetener productos categoría salats
  getSalats(){
    this.filteredList = this.productsList.filter(product => product.category == 'salats');
  }

  //Obetener productos categoría main
  getMain(){
    this.filteredList = this.productsList.filter(product => product.category == 'main');
  }

  //Obetener productos categoría drinks
  getDrinks(){
    this.filteredList = this.productsList.filter(product => product.category == 'drinks');
  }

}
