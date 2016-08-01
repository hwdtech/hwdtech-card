import './styles/index.scss';
import 'waypoints/lib/noframework.waypoints';
import smoothScroll from 'smooth-scroll';

smoothScroll.init();

import Animated from './js/animated';
import Modal from './js/modal';
import Navigation from './js/navigation';
import ScrollTopButton from './js/scroll-top-button';
import Statistics from './js/statistics';
import Portfolio from './js/portfolio';

document.querySelectorAll('[data-animated]').forEach(element => new Animated(element));
document.querySelectorAll('[role="modal"]').forEach(element => new Modal(element));

new ScrollTopButton(document.querySelector('.hwd-scroll-top-btn'));
new Navigation(document.getElementById('navigation-menu'));
new Statistics(document.getElementById('statistics'));
new Portfolio(document.getElementById('portfolio'));
