import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './categoriesService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCategoryComponent } from '../modal-category/modal-category.component';
import { ConfirmDeleteModalComponentC } from '../modal-category/ConfirmDeleteModalComponent';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit {
  categories: any[] = []; 
  currentPage: number = 1;
  itemsPerPage: number = 30;

  constructor(private categoryService: CategoriesService ,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadCategories(); 
  }

  get totalPages(): number {
    return Math.ceil(this.categories.length / this.itemsPerPage);
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

  get displayedCatgories(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.categories.slice(startIndex, endIndex);
    }
  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Error al obtener categorías', error);
      }
    });
  }

  createCategory(): void {
  
    const modalRef = this.modalService.open(ModalCategoryComponent);
    modalRef.result.then((result) => {
      console.log(`Modal cerrado con resultado: ${result}`);
    }, (reason) => {
      console.log(`Modal cerrado con razón: ${reason}`);
    });
  }

editCategory(category: any): void {
  const modalRef = this.modalService.open(ModalCategoryComponent);
  modalRef.componentInstance.isEditMode = true;
  modalRef.componentInstance.category = category;
  modalRef.result.then((result) => {
    console.log(`Modal cerrado con resultado: ${result}`);
  }, (reason) => {
    console.log(`Modal cerrado con razón: ${reason}`);
  });
}


  deleteCategory(categoryId: number): void {
    const confirmModal = this.modalService.open(ConfirmDeleteModalComponentC);
    confirmModal.componentInstance.category = categoryId;
    confirmModal.result.then((result) => {
      if (result === 'confirm') {
        this.categoryService.deleteCategory(categoryId).subscribe(response => {
          if (response.status === 200) {
            console.log('Producto eliminado exitosamente');
            confirmModal.close()
            window.location.reload()
          } else {
            console.error(`Error al eliminar el producto. Código de estado: ${response.status}`);
          }
        }, error => {
          if (error.status === 200) {
            console.log('Producto eliminado exitosamente');
            confirmModal.close()
            window.location.reload()
          } else {
            console.error(`Error al eliminar el producto. Código de estado: ${error.status}`);
          }
        });
      }
    });
  }
}


