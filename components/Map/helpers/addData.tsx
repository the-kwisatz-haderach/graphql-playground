import mapboxgl from 'mapbox-gl'
import { render } from 'react-dom'
import Tooltip from '../components/Tooltip'
import { DataPoint } from '../Map'
import styles from '../Map.module.css'

const MARKER_ICON = 'fas fa-map-marker'
// fas fa-toilet

export default function addData(map: mapboxgl.Map, data: DataPoint[]): void {
  map.on('load', ({ target }) => {
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      anchor: 'top',
      offset: 14,
    })
    let lastClicked = ''

    data.forEach((feature) => {
      const el = document.createElement('div')
      el.className = styles.marker

      const icon = document.createElement('i')
      icon.className = MARKER_ICON

      el.appendChild(icon)
      el.onclick = () => {
        popup.remove()

        if (lastClicked === feature.id) {
          lastClicked = ''
          return
        }

        target.flyTo({
          center: feature.coordinates,
        })

        const popupNode = document.createElement('div')
        render(
          <Tooltip
            data={feature}
            onClose={() => {
              popup.remove()
              lastClicked = ''
            }}
          />,
          popupNode
        )

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup
          .setLngLat(feature.coordinates)
          .setDOMContent(popupNode)
          .addTo(target)

        lastClicked = feature.id
      }

      new mapboxgl.Marker(el).setLngLat(feature.coordinates).addTo(target)
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
  })
}
