class Map {
  constructor(selector = document.getElementById('map'), pointer, coordinates = {}) {
    this.selector = selector
    this.coordinates = coordinates
    this.pointer = pointer
  }
  initMap() {
    if (typeof google !== 'undefined') {
      let map = new google.maps.Map(this.selector, {
        zoom: 14,
        center: this.coordinates,
      })

      let marker // eslint-disable-line no-unused-vars

      marker = new google.maps.Marker({
        position: this.coordinates,
        map: map,
        icon: this.pointer,
      })
    } else {
      console.error('Google Maps API probably missed.')
    }
  }
}

export default Map
