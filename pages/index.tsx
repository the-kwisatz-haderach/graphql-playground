import Head from 'next/head'
import { useQuery } from '@apollo/client'
import { useEffect, useRef, useState } from 'react'
import { GetStaticProps } from 'next'
import mapboxgl from 'mapbox-gl'
import Main from '../layouts/Main'
import { ILocation } from '../types/graphql'
import connectToDb from '../db/utils/connectToDb'
import convertToGeoJSON from '../lib/mapBoxUtils/convertToGeoJSON'
import Locator from '../components/Locator'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOXGL_ACCESS_TOKEN as string

type Props = {
  locations: ILocation[]
}

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
        zoom,
      })

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      })

      map.on('move', () => {
        setLng(+map.getCenter().lng.toFixed(4))
        setLat(+map.getCenter().lat.toFixed(4))
        setZoom(+map.getZoom().toFixed(2))
      })

      map.on('load', () => {
        const layerName = 'points'

        map.addSource(layerName, convertToGeoJSON(locations))
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

      map.on('click', 'symbols', function (e) {
        if (e.features) {
          map.flyTo({
            center: e.features[0].geometry.coordinates,
          })
        }
      })

      // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
      map.on('mouseenter', 'symbols', function (e) {
        map.getCanvas().style.cursor = 'pointer'
        const coordinates = e.features[0].geometry.coordinates.slice()
        const description = e.features[0].properties.description

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(description).addTo(map)
      })

      // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'symbols', function () {
        map.getCanvas().style.cursor = ''
        popup.remove()
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
    return () => map.remove()
  }, [mapContainer, locations])

  return (
    <Main>
      <Head>
        <link
          href={process.env.NEXT_PUBLIC_MAPBOXGL_CSS_HREF}
          rel="stylesheet"
        />
      </Head>
      <div className="locator-container">
        <Locator lat={lat} lng={lng} zoom={zoom} />
      </div>
      <div
        id="map"
        ref={mapContainer}
        style={{ height: '100vh', width: '100vw' }}
      />
      <style jsx>{`
        .locator-container {
          width: 400px;
          position: absolute;
          left: calc(50% - 200px);
          top: 10px;
          z-index: 1;
        }
      `}</style>
    </Main>
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
