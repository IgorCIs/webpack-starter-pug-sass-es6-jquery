import Swiper from 'swiper'

const Gallery = () => {
  const element = '#slider'


  const slider = new Swiper(element, {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })

}

export default Gallery