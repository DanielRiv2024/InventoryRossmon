import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../categories/categoriesService';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-category',
  templateUrl: './modal-category.component.html',
})
export class ModalCategoryComponent implements OnInit {
  @Input() category: any | null = null;
  isEditMode: boolean = false;

  categoryForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.initForm();

    if (this.isEditMode && this.category) {
      this.categoryForm.patchValue(this.category);
    }
  }

  private initForm(): void {
    this.categoryForm = this.formBuilder.group({
      id: this.category?.id || 1,
      name: ['', Validators.required],
      description: [''],
      createdBy: localStorage.getItem('idUser'),
      updateBy: localStorage.getItem('idUser'),
    });
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const categoryData = this.categoryForm.value;

      if (this.isEditMode && this.category) {
       

console.log(this.category)
this.categoriesService.updateCategory(this.category.id , categoryData).subscribe(
  (createdCategory) => {
    if (createdCategory) {
      console.log('Categoría creada exitosamente', createdCategory);
      this.activeModal.close('Categoría creada exitosamente');
      window.location.reload();
    } else {
      console.error('Error al crear la categoría');
    }
  },
  (error) => {
    if (error.status == 200) {
      this.activeModal.close('Categoría creada exitosamente');
      window.location.reload();
    } else {
      console.error('Error al crear la categoría', error);
    }
  }
);
      } else {
        this.categoriesService.createCategory(categoryData).subscribe(
          (createdCategory) => {
            if (createdCategory) {
              console.log('Categoría creada exitosamente', createdCategory);
              this.activeModal.close('Categoría creada exitosamente');
              window.location.reload();
            } else {
              console.error('Error al crear la categoría');
            }
          },
          (error) => {
            if (error.status == 200) {
              this.activeModal.close('Categoría creada exitosamente');
              window.location.reload();
            } else {
              console.error('Error al crear la categoría', error);
            }
          }
        );
      }
    }
  }
}
