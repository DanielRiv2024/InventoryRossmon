import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ProductService } from './ProductService';
import { CategoriesService } from '../categories/categoriesService';
import { ModalProductComponent } from '../modal-product/modal-product.component';
import { ConfirmDeleteModalComponent } from '../modal-product/ConfirmDeleteModalComponent';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  transformedProducts: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  categorias: any[] = [];
  nameFromLocalStorage: string | null = '';

  constructor(
    private productService: ProductService, 
    private categoriesService: CategoriesService, 
    private modalService: NgbModal, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.nameFromLocalStorage = localStorage.getItem('name');
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (data) => {
        this.categorias = data;
        this.transformProducts(); 
      },
      error: (error) => {
        console.error('Error al obtener categorías', error);
      }
    });
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.transformProducts();
      },
      error: (error) => {
        console.error('Error al obtener productos', error);
      }
    });
  }

  private getCategoryName(categoryId: number): string {
    const category = this.categorias.find(cat => cat.id === categoryId);
    return category ? category.name : 'Desconocido';
  }

  private transformProducts(): void {
    if (this.products.length > 0 && this.categorias.length > 0) {
      this.transformedProducts = this.products.map(product => {
        return {
          ...product,
          categoryName: this.getCategoryName(product.category)
        };
      });
    }
  }

  get totalPages(): number {
    return Math.ceil(this.transformedProducts.length / this.itemsPerPage);
  }

  get displayedProducts(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.transformedProducts.slice(startIndex, endIndex);
  }

  setItemsPerPage(num: number): void {
    this.itemsPerPage = num;
    this.currentPage = 1;
  }

  navigateToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  editProduct(product: any): void {
    const modalRef = this.modalService.open(ModalProductComponent);
    modalRef.componentInstance.product = product;
  }

  addProduct(): void {
    const modalRef = this.modalService.open(ModalProductComponent);
    modalRef.result.then((result) => {
      console.log(`Modal cerrado con resultado: ${result}`);
    }, (reason) => {
      console.log(`Modal cerrado con razón: ${reason}`);
    });
  }

  deleteProduct(product: any): void {
    const confirmModal = this.modalService.open(ConfirmDeleteModalComponent);
    confirmModal.componentInstance.productName = product.name;
    confirmModal.result.then((result) => {
      if (result === 'confirm') {
        this.productService.deleteProduct(product.id).subscribe(response => {
          console.log('Producto eliminado exitosamente');
          confirmModal.close();
          window.location.reload();
          this.loadProducts(); 
        }, error => {
          console.error(`Error al eliminar el producto. Código de estado: ${error.status}`);
        });
      }
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
