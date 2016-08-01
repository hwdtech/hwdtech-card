import autobind from 'core-decorators/lib/autobind';

export default class ModalComponent {
  static MODAL_OPENED_CLS = 'hwd-modal--opened';
  static DIALOG_OPENED_CLS = 'hwd-modal-dialog--opened';
  static BODY_CLS = 'modal-open';

  constructor(element) {
    this.modalId = element.getAttribute('id');

    this.modal = element;
    this.dialog = element.querySelector('.hwd-modal-dialog');

    document.querySelectorAll(`[data-modal-toggle="#${this.modalId}"]`)
      .forEach(element => element.addEventListener('click', this.onControlClick));

    this.modal.addEventListener('click', this.onModalClick);
  }

  destroy() {
    document.querySelectorAll(`[data-modal-toggle="#${this.modalId}"]`)
      .forEach(element => element.removeEventListener('click', this.onControlClick));

    this.modal.removeEventListener('click', this.onModalClick);
  }

  @autobind
  onControlClick() {
    this.toggle();
  }

  @autobind
  onModalClick(event) {
    if (this.modal === event.target) {
      this.toggle();
    }

    event.preventDefault();
  }

  toggle() {
    this.modal.scrollTop = 0;

    this.modal.classList.toggle(ModalComponent.MODAL_OPENED_CLS);
    this.dialog.classList.toggle(ModalComponent.DIALOG_OPENED_CLS);
    document.body.classList.toggle(ModalComponent.BODY_CLS);
  }
}
