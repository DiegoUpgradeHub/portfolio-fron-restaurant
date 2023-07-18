import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent {

  createForm!: FormGroup;

  constructor(
    public fb: FormBuilder,
    public productsService: ProductsService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) {
    this.createForm = this.fb.group({
      name: [''],
      price: [''],
      ingredients: [''],
      image: [''],
      category: ['']
    })
  }

  ngOnInit(): void {}

  // creatingProduct() {
  //   this.productsService.createProduct(this.createForm.value).subscribe(() => {
  //     window.location.reload();
  //   })
  // }

  creatingProduct() {
    // Aquí convierte los valores de los inputs en minúsculas antes de enviarlos al servidor
    const formData = this.createForm.value;
    formData.name = formData.name.toLowerCase();
    formData.price = formData.price.toLowerCase();
    formData.ingredients = formData.ingredients.toLowerCase();
    formData.image = formData.image.toLowerCase();
    formData.category = formData.category.toLowerCase();

    // Envía formData al servicio para crear el producto
    this.productsService.createProduct(formData).subscribe(() => {
      window.location.reload();
    });
  }

}
