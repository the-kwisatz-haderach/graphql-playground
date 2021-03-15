import mapboxgl from 'mapbox-gl'
import { ILocation } from '../../types/graphql'
import convertToGeoJSON from './convertToGeoJSON'

export default function addDataLayer(
  map: mapboxgl.Map,
  locationData: ILocation[]
): void {
  map.on('load', () => {
    const locations = convertToGeoJSON(locationData)
    locations?.data?.features.forEach((feature) => {
      const el = document.createElement('div')
      el.className = 'marker'
      const icon = document.createElement('i')
      icon.className = 'fas fa-toilet'
      el.appendChild(icon)
      const [lng, lat] = feature.geometry.coordinates
      new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(map)
    })
  })
}
