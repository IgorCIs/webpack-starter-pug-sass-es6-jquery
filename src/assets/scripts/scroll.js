const scroll = (element) => {
  console.log(element)
  window.scroll({
    behavior: 'smooth',
    left: 0,
    top: element.offsetTop
  });
}

export default () => {
  [...document.querySelectorAll('a[href^="#"]')].forEach(item => {   
    item.addEventListener('click', event => {
      event.preventDefault()
      scroll(document.getElementById(item.href.split('#')[1]))
    })
  })
}