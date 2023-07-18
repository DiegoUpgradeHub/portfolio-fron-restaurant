import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent {

  deleteForm!: FormGroup;

  @Input() product: any = {}


  constructor(
    public fb: FormBuilder,
    public productService: ProductsService,
    public router: Router,
    public actRoute: ActivatedRoute,
  ) {
    this.deleteForm = this.fb.group({
      _id:['']
    })
  }

  ngOnInit(): void {
    this.deleteForm.get('_id')?.setValue(this.product._id);
  }

  deletingThisProduct(_id: string): void {
    this.productService.deleteProduct(_id).subscribe(() => {
      window.location.reload();
    })
  }

}
