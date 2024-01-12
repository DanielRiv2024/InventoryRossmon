import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
})
export class ConfirmDeleteModalComponent {
  @Input() productName: string | undefined;

  constructor(public activeModal: NgbActiveModal) {}

  confirmDelete(): void {
    this.activeModal.close('confirm');
  }

  cancelDelete(): void {
    this.activeModal.close('cancel');
  }
}
