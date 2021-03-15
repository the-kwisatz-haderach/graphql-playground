import { memo, ReactElement, useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import addData from './helpers/addData'
import styles from './Map.module.css'
import { ILocation } from '../../types/graphql'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOXGL_ACCESS_TOKEN as string

export type DataPoint = {
  id: ILocation['_id']
  name: ILocation['name']
  description: string
  coordinates: [number, number]
  reviews: ILocation['reviews']
  creator: ILocation['creator']
}

type Props = {
  data: DataPoint[]
  isAddingDataPoint: boolean
  interactive?: boolean
  lng?: number
  lat?: number
  zoom?: number
}

function Map({
  data,
  isAddingDataPoint,
  lng = 125,
  lat = 10,
  zoom = 9,
  interactive = true,
}: Props): ReactElement {
  const mapContainer = useRef<HTMLDivElement>(null)
  const [mapState, setMapState] = useState<mapboxgl.Map>()
  const [markerState, setMarkerState] = useState<mapboxgl.Marker>()

  useEffect(() => {
    if (mapState && markerState) {
      if (!isAddingDataPoint) {
        markerState.remove()
        return
      }
      const [centerLng, centerLat] = mapState.getCenter().toArray()
      markerState.setLngLat([centerLng, centerLat]).addTo(mapState)
    }
  }, [isAddingDataPoint, mapState, markerState])

  useEffect(() => {
    if (mapContainer.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v10',
        center: [lng, lat],
        zoom,
      })
      setMapState(map)
      addData(map, data)
      const marker = new mapboxgl.Marker()

      setMarkerState(marker)

      map.on('move', ({ target }) => {
        const [centerLng, centerLat] = target.getCenter().toArray()
        marker.setLngLat([centerLng, centerLat])
      })
    }

    return () => {
      mapState?.remove()
    }
  }, [mapContainer, data])

  return (
    <div
      id="map"
      ref={mapContainer}
      className={styles['map-container']}
      style={{ pointerEvents: interactive ? 'all' : 'none' }}
    />
  )
}

export default memo(Map)
