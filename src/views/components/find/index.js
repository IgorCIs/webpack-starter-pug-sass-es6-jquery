const Find = () => {
  const key = 'AIzaSyDjKYt8XbEsvj857b6vmjbJKvmvLq2dbzU';
  const src = 'https://maps.googleapis.com/maps/api/js?key=' + key;
  const script = document.createElement('script');

  const mapEl = document.getElementById('map');


  if (mapEl) {    
      script.setAttribute('src', src);
      document.body.appendChild(script);

      const initMap = () => {
          const pos = {
            lat: 46.485345, 
            lng: 30.737520
          };

          const map = new google.maps.Map(mapEl, {
              zoom: 17,
              disableDefaultUI: true,
              center: pos,
              styles: require('./map').default
          });

          new google.maps.Marker({
              position: pos,
              map: map
          });

          const setHeight = () => {
            console.log(mapEl.offsetWidth)
            mapEl.style.height = mapEl.offsetWidth + 'px'
          }
    
          setHeight()
          window.addEventListener('resize', setHeight)
      }      

      script.addEventListener('load', initMap)
  }

}

export default Find