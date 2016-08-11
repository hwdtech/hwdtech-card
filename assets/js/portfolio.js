import autobind from 'core-decorators/lib/autobind';

export default class Portfolio {
  static SHOW_MORE_BUTTON_SELECTOR = '.hwd-portfolio-button';
  static ADDITIONAL_PROJECT_SELECTOR = '.hwd-portfolio__additional';
  static ANIMATION = 'fadeIn';

  constructor(element) {
    this.element = element;

    this.showMoreBtn = element.querySelector(Portfolio.SHOW_MORE_BUTTON_SELECTOR);
    if (this.showMoreBtn) {
      this.showMoreBtn.addEventListener('click', this.onShowMoreClick);
    }
  }

  destroy() {
    if (this.showMoreBtn) {
      this.showMoreBtn.removeEventListener('click', this.onShowMoreClick);
    }
  }

  @autobind
  onShowMoreClick() {
    this.showMoreBtn.remove();
    this.element.querySelector(Portfolio.ADDITIONAL_PROJECT_SELECTOR)
      .classList.add('is-appeared', 'animated', Portfolio.ANIMATION);
  }
}
