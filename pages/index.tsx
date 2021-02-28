import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import { GetStaticProps } from 'next'
import mapboxgl from 'mapbox-gl'

type Props = {
  accessToken?: string
}

function HomePage({ accessToken }: Props) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const [lng, setLng] = useState(-70.9)
  const [lat, setLat] = useState(42.35)
  const [zoom, setZoom] = useState(9)

  useEffect(() => {
    if (!mapboxgl.accessToken && accessToken) {
      mapboxgl.accessToken = accessToken
    }

    let map: any
    if (mapContainer.current && !map) {
      map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom,
      })

      map.on('move', () => {
        setLng(map.getCenter().lng.toFixed(4))
        setLat(map.getCenter().lat.toFixed(4))
        setZoom(map.getZoom().toFixed(2))
      })
    }
    return () => map.remove()
  }, [mapContainer])

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
  return {
    props: {
      accessToken: process.env.MAPBOXGL_ACCESS_TOKEN,
    },
  }
}

export default HomePage
