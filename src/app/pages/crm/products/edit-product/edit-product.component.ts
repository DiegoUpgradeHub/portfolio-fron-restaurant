import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router'
import { ProductsService } from 'src/app/core/services/products.service';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {

  editProductForm!: FormGroup;

  @Input() product: any;

  constructor(
    public fb: FormBuilder,
    public productService: ProductsService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) {
    this.editProductForm = this.fb.group({
      _id:[''],
      name: [''],
      price: [''],
      ingredients: [''],
      image: [''],
      category: ['']
    })
  }

  ngOnInit(): void {
    this.editProductForm.get('_id')?.setValue(this.product._id);
    this.editProductForm.get('name')?.setValue(this.product.name);
    this.editProductForm.get('price')?.setValue(this.product.price);
    this.editProductForm.get('ingredients')?.setValue(this.product.ingredients);
    this.editProductForm.get('image')?.setValue(this.product.image);
    this.editProductForm.get('category')?.setValue(this.product.category);
    console.log(this.product)
  }

  editingThisProduct(productId: any) {
    this.productService.editProduct(this.editProductForm.value, productId.trim()).subscribe(() => {
      window.location.reload();
    })
  }

}
