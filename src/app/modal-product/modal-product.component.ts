import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../product/Product';
import { CategoriesService } from '../categories/categoriesService';
import { ProductService } from '../product/ProductService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDeleteModalComponent } from './ConfirmDeleteModalComponent';
@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
})
export class ModalProductComponent  implements OnInit {
  @Input() product: Product | null = null;
  productForm!: FormGroup;
  categorias: any[] = [];

  constructor(private formBuilder: FormBuilder, private categoriesService: CategoriesService , private productService : ProductService , private activeModal: NgbActiveModal , private modalService: NgbModal) {}

  ngOnInit(): void {
    
    this.initForm();
    this.loadCategories();
  
    if (this.product) {
      this.productForm.patchValue(this.product);
    }
  }
  
    private initForm(): void {
      this.productForm = this.formBuilder.group({
        id: [{value: this.product?.id || 1}],
        name: ['', Validators.required],
        price: [0, [Validators.required, Validators.min(0)]],
        amount: [0, [Validators.required, Validators.min(0)]],
        category: ['', Validators.required],
        createdBy: [{value: localStorage.getItem("id")}], 
        updateBy: [{value: localStorage.getItem("id")}] 
      });
    }
    
  
  private loadCategories(): void {
    this.categoriesService.getAllCategories().subscribe(data => {
      this.categorias = data;
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
  
      if (this.product) {
        this.productService.updateProduct(this.product.id, productData).subscribe(response => {
          if (response.status === 200) {
            console.log('Producto actualizado exitosamente');
            this.activeModal.close('Producto actualizado exitosamente');
          } else {
            console.error(`Error al actualizar el producto. Código de estado: ${response.status}`);
          }
        }, error => {
          if (error.status === 200) {
            console.log('Producto actualizado exitosamente');
            this.activeModal.close('Producto actualizado exitosamente');
          } else {
            console.error(`Error al actualizar el producto. Código de estado: ${error.status}`);
          }
        });
        
      } else {
        this.productService.createProduct(productData).subscribe(/* ... */);
      }
    }
  }
  
  

}