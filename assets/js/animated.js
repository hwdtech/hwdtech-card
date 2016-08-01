import autobind from 'core-decorators/lib/autobind';

export default class AnimatedComponent {
  static DEFAULT_ANIMATION_CLS = 'fadeInUp';

  constructor(element) {
    this.element = element;
    this.animationCls = element.getAttribute('data-animated') ||
      AnimatedComponent.DEFAULT_ANIMATION_CLS;

    this._waypointInstance = new window.Waypoint({
      element,
      offset: '100%',
      handler: this.onElementAppearance
    });
  }

  destroy() {
    this._waypointInstance.destroy();
  }

  @autobind
  onElementAppearance() {
    this._waypointInstance.destroy();

    if (this.elementShouldBeAnimated()) {
      this.element.classList.add('animated', this.animationCls);
    }
  }

  elementShouldBeAnimated() {
    let element = this.element;
    let top = element.offsetTop;

    while (element.offsetParent) {
      element = element.offsetParent;
      top += element.offsetTop;
    }

    return top >= window.pageYOffset;
  }
}
