import raf from 'raf';
import autobind from 'core-decorators/lib/autobind';
import CountUp from 'countup.js';

raf.polyfill();

export default class Statistics {
  static STATISTIC_ELEMENT_SELECTOR = '.hwd-profile-statistic__value';

  constructor(element) {
    this.element = element;

    this._waypointInstance = new window.Waypoint({
      element,
      offset: '100%',
      handler: this.onElementAppearance
    });
  }

  destroy() {
    this._waypointInstance.destroy();
    this._animations.map(anim => anim.reset());
  }

  @autobind
  onElementAppearance() {
    this._waypointInstance.destroy();
    this.element.querySelectorAll(Statistics.STATISTIC_ELEMENT_SELECTOR)
      .forEach(el => (new CountUp(el, 0, el.getAttribute('data-value'))).start());
  }
}
