import { AnySourceData } from 'mapbox-gl'
import { ILocation } from '../../types/graphql'

const DATA_TYPE = 'geojson'

export default function convertToGeoJSON(
  locations: ILocation[]
): AnySourceData {
  return {
    type: DATA_TYPE,
    data: {
      type: 'FeatureCollection',
      features: locations.map((location) => ({
        type: 'Feature',
        properties: {
          title: location.name,
          description:
            '<strong>Make it Mount Pleasant</strong><p>Make it Mount Pleasant is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
        },
        geometry: {
          type: 'Point',
          coordinates: [
            +location.coordinates.longitude,
            +location.coordinates.latitude,
          ],
        },
      })),
    },
  }
}
