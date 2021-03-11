import mapboxgl from 'mapbox-gl'
import { ILocation } from '../../types/graphql'
import convertToGeoJSON from './convertToGeoJSON'

export default function addDataLayer(
  map: mapboxgl.Map,
  locationData: ILocation[]
): void {
  map.on('load', () => {
    const layerName = 'points'

    map.addSource(layerName, convertToGeoJSON(locationData))
    map.addLayer({
      id: 'symbols',
      type: 'circle',
      source: layerName,
      paint: {
        'circle-color': '#918af7',
        'circle-stroke-color': '#3327e5',
        'circle-stroke-width': 2,
      },
    })
  })
}
