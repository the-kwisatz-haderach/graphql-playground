import Head from 'next/head'
import { useQuery } from '@apollo/client'
import { useEffect, useRef, useState } from 'react'
import { GetStaticProps } from 'next'
import mapboxgl from 'mapbox-gl'
import { ILocation } from '../types/graphql'
import connectToDb from '../db/utils/connectToDb'

type Props = {
  locations: ILocation[]
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOXGL_ACCESS_TOKEN as string

function HomePage({ locations }: Props) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const [lng, setLng] = useState(125.6)
  const [lat, setLat] = useState(10.1)
  const [zoom, setZoom] = useState(9)

  useEffect(() => {
    let map: mapboxgl.Map

    if (mapContainer.current) {
      map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v10',
        center: [lng, lat],
        zoom: zoom,
      })

      // locations.forEach((location) => {
      //   new mapboxgl.Marker()
      //     .setLngLat([
      //       +location.coordinates.longitude,
      //       +location.coordinates.latitude,
      //     ])
      //     .addTo(map)
      // })

      map.on('move', () => {
        setLng(+map.getCenter().lng.toFixed(4))
        setLat(+map.getCenter().lat.toFixed(4))
        setZoom(+map.getZoom().toFixed(2))
      })

      map.on('load', () => {
        map.addSource('points', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: [-91.395263671875, -0.9145729757782163],
                },
              },
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: [-90.32958984375, -0.6344474832838974],
                },
              },
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: [-91.34033203125, 0.01647949196029245],
                },
              },
            ],
          },
        })

        map.addLayer({
          id: 'symbols',
          type: 'circle',
          source: 'points',
          paint: {
            'circle-color': '#918af7',
            'circle-stroke-color': '#3327e5',
            'circle-stroke-width': 2,
          },
        })
      })

      map.on('click', 'symbols', function (e) {
        if (e.features) {
          map.flyTo({
            center: e.features[0].geometry.coordinates,
          })
        }
      })

      // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
      map.on('mouseenter', 'symbols', function () {
        map.getCanvas().style.cursor = 'pointer'
      })

      // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'symbols', function () {
        map.getCanvas().style.cursor = ''
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
