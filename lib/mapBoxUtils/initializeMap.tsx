import { render } from 'react-dom'
import mapboxgl from 'mapbox-gl'
import Tooltip from '../../components/Tooltip'

export default function initializeMap(map: mapboxgl.Map): void {
  const popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: false,
  })

  map.on('click', 'symbols', function (e) {
    if (e.features) {
      map.flyTo({
        center: e.features[0].geometry.coordinates,
      })

      const coordinates = e.features[0].geometry.coordinates.slice()
      const { properties } = e.features[0]

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
      }

      const popupNode = document.createElement('div')
      render(
        <Tooltip
          title={properties.title}
          description={properties.description}
        />,
        popupNode
      )

      // Populate the popup and set its coordinates
      // based on the feature found.
      popup.setLngLat(coordinates).setDOMContent(popupNode).addTo(map)
    }
  })

  // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
  map.on('mouseenter', 'symbols', function (e) {
    map.getCanvas().style.cursor = 'pointer'
  })

  // Change it back to a pointer when it leaves.
  map.on('mouseleave', 'symbols', function () {
    map.getCanvas().style.cursor = ''
  })

  // Add zoom and rotation controls to the map.
  map.addControl(new mapboxgl.NavigationControl())

  // Add geolocate control to the map.
  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    })
  )

  map.addControl(new mapboxgl.FullscreenControl())
}
