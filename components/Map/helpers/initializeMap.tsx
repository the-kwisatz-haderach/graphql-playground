import { render } from 'react-dom'
import mapboxgl from 'mapbox-gl'
import Tooltip from '../components/Tooltip'

export type MapEventListener = (
  e: mapboxgl.MapMouseEvent & {
    features?: mapboxgl.MapboxGeoJSONFeature[] | undefined
  } & mapboxgl.EventData
) => void

const handleMouseEnter: MapEventListener = ({ target }) => {
  target.getCanvas().style.cursor = 'pointer'
}

const handleMouseLeave: MapEventListener = ({ target }) => {
  target.getCanvas().style.cursor = ''
}

const handleClickSymbols: MapEventListener = ({ target, features, lngLat }) => {
  const popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: false,
  })

  if (features) {
    target.flyTo({
      center: features[0].geometry.coordinates,
    })

    const coordinates = features[0].geometry.coordinates.slice()
    const { properties } = features[0]

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += lngLat.lng > coordinates[0] ? 360 : -360
    }

    const popupNode = document.createElement('div')
    render(
      <Tooltip
        title={properties?.title ?? ''}
        description={properties?.description ?? ''}
      />,
      popupNode
    )

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates).setDOMContent(popupNode).addTo(target)
  }
}

export default function initializeMap(map: mapboxgl.Map): void {
  map.on('click', 'symbols', handleClickSymbols)

  // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
  map.on('mouseenter', 'symbols', handleMouseEnter)

  // Change it back to a pointer when it leaves.
  map.on('mouseleave', 'symbols', handleMouseLeave)
}
