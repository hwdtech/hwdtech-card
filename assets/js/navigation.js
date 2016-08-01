import autobind from 'core-decorators/lib/autobind';

export default class Navigation {
  static ACTIVE_MENU_CLS = 'is-active';
  static BODY_CLS = 'menu-active';
  static STUCK_CLS = 'is-stuck';

  constructor(element) {
    this.element = element;
    this.offset = element.offsetTop;

    this.navigationButton = element.querySelector('.hwd-navigation__button');

    this.onScroll();
    window.addEventListener('scroll', this.onScroll);
    this.element.querySelectorAll('.hwd-navigation__button,.hwd-navigation__backdrop')
      .forEach(element => element.addEventListener('click', this.toggle));
    this.element.querySelectorAll('.hwd-navigation-menu-item__link')
      .forEach(element => element.addEventListener('click', this.close));
  }

  destroy() {
    window.removeEventListener('scroll', this.onScroll);
    this.element.querySelectorAll('.hwd-navigation__button,.hwd-navigation__backdrop')
      .forEach(element => element.removeEventListener('click', this.toggle));
    this.element.querySelectorAll('.hwd-navigation-menu-item__link')
      .forEach(element => element.removeEventListener('click', this.close));
  }

  @autobind
  toggle() {
    this.element.classList.toggle(Navigation.ACTIVE_MENU_CLS);
    document.body.classList.toggle(Navigation.BODY_CLS);
  }

  @autobind
  open() {
    this.element.classList.add(Navigation.ACTIVE_MENU_CLS);
    document.body.classList.add(Navigation.BODY_CLS);
  }

  @autobind
  close() {
    this.element.classList.remove(Navigation.ACTIVE_MENU_CLS);
    document.body.classList.remove(Navigation.BODY_CLS);
  }

  @autobind
  onScroll() {
    if (document.body.scrollTop > this.offset) {
      this.element.classList.add(Navigation.STUCK_CLS);
      return;
    }

    this.element.classList.remove(Navigation.STUCK_CLS);
  }
}
