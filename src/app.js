import 'styles/app.sass';
import 'normalize.css'
import Gallery from './views/components/gallery'
import 'swiper/dist/css/swiper.min.css'
import Find from './views/components/find';
import Trigger from './assets/scripts/trigger';
import scroll from './assets/scripts/scroll';
import Popup from './assets/scripts/popup';
import form from './views/components/banner/form';

$(document).ready(() => {
  Gallery()
  Find()
  Trigger()
  scroll()
  form()
  new Popup()
});
