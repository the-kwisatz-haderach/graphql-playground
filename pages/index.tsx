import Head from 'next/head'
import { useQuery } from '@apollo/client'
import { useEffect, useRef, useState } from 'react'
import { GetStaticProps } from 'next'
import mapboxgl from 'mapbox-gl'
import { Location } from '../types/graphql'
import connectToDb from '../db/utils/connectToDb'
import queries from '../db/queries'

type Props = {
  locations: Location[]
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOXGL_ACCESS_TOKEN as string

function HomePage({ locations }: Props) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const [lng, setLng] = useState(125.6)
  const [lat, setLat] = useState(10.1)
  const [zoom, setZoom] = useState(9)

  useEffect(() => {
    let map: mapboxgl.Map
    if (mapContainer.current && !map) {
      map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom,
      })

      locations.forEach((location) => {
        new mapboxgl.Marker()
          .setLngLat([
            +location.coordinates.longitude,
            +location.coordinates.latitude,
          ])
          .addTo(map)
      })

      map.on('move', () => {
        setLng(+map.getCenter().lng.toFixed(4))
        setLat(+map.getCenter().lat.toFixed(4))
        setZoom(+map.getZoom().toFixed(2))
      })
    }
    return () => map.remove()
  }, [mapContainer, locations])

  return (
    <div>
      <Head>
        <link
          href="https://api.tiles.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div
        id="map"
        ref={mapContainer}
        style={{ height: '100vh', width: '100vw' }}
      />
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { queries } = await connectToDb()

  const locations = await queries.findLocations()

  return {
    props: {
      locations,
    },
  }
}

export default HomePage
