import autobind from 'core-decorators/lib/autobind';

export default class ScrollTopButton {
  static OFFSET = 100;

  constructor(element) {
    this.element = element;

    this.onScroll();
    window.addEventListener('scroll', this.onScroll);
  }

  destroy() {
    window.removeEventListener('scroll', this.onScroll);
  }

  @autobind
  onScroll() {
    if (document.body.scrollTop <= ScrollTopButton.OFFSET) {
      this.element.classList.add('is-hidden');
      return;
    }

    this.element.classList.remove('is-hidden');
  }
}
