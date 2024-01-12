// product.component.ts
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { ProductService } from './ProductService';
import { ModalProductComponent } from '../modal-product/modal-product.component';
import { ConfirmDeleteModalComponent } from '../modal-product/ConfirmDeleteModalComponent';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private productService: ProductService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  get totalPages(): number {
    return Math.ceil(this.products.length / this.itemsPerPage);
  }

  get displayedProducts(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.products.slice(startIndex, endIndex);
  }

  navigateToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        // Asumiendo que 'data' es una lista de todos tus productos
        this.products = data;
      },
      error: (error) => {
        console.error('Error al obtener productos', error);
      }
    });
  }

  setItemsPerPage(num: number): void {
    this.itemsPerPage = num;
    this.currentPage = 1; // Restablece a la primera página
  }

  editProduct(product: any): void {
    const modalRef = this.modalService.open(ModalProductComponent);
    modalRef.componentInstance.product = product; // Pasar el producto al modal

    // Resto de tu lógica...
  }

  addProduct(): void {
    const modalRef = this.modalService.open(ModalProductComponent);

    // Puedes suscribirte a eventos del modal si es necesario
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
          if (response.status === 200) {
            console.log('Producto eliminado exitosamente');
            confirmModal.close()
          } else {
            console.error(`Error al eliminar el producto. Código de estado: ${response.status}`);
          }
        }, error => {
          if (error.status === 200) {
            console.log('Producto eliminado exitosamente');
            confirmModal.close()
          } else {
            console.error(`Error al eliminar el producto. Código de estado: ${error.status}`);
          }
        });
      }
    });
  }
  
  }
  

