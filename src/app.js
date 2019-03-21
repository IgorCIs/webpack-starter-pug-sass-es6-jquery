import 'styles/app.sass';
import 'normalize.css'
import Gallery from './views/components/gallery'
import 'swiper/dist/css/swiper.min.css'
import Find from './views/components/find';

$(document).ready(() => {
  Gallery()
  Find()
});
