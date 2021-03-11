import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import { GetStaticProps } from 'next'
import mapboxgl, { MapboxEvent } from 'mapbox-gl'
import Main from '../layouts/Main'
import { ILocation } from '../types/graphql'
import connectToDb from '../db/utils/connectToDb'
import Locator from '../components/Locator'
import initializeMap from '../lib/mapBoxUtils/initializeMap'
import addDataLayer from '../lib/mapBoxUtils/addDataLayer'
import styles from './index.module.css'
import { AddLocation, CloseSharp, Add } from '@material-ui/icons'
import HelpIcon from '@material-ui/icons/Help'
import { IconButton } from '../components/IconButton'
import { IconButton as MuiIconButton } from '@material-ui/core'
import LocationIcon from '../components/LocationIcon/LocationIcon'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOXGL_ACCESS_TOKEN as string

type Props = {
  locations: ILocation[]
}

const INITIAL_LNG = 125.6
const INITIAL_LAT = 10.1
const INITIAL_ZOOM = 9

function HomePage({ locations }: Props) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map>()
  const markerRef = useRef<mapboxgl.Marker>()
  const [showInfo, setShowInfo] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [isMoving, setIsMoving] = useState(false)

  const handleAddLocation = () => {
    setIsAdding((curr) => !curr)
  }

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.remove()
    }
    if (mapRef.current) {
      const [lng, lat] = mapRef.current.getCenter().toArray()
      markerRef.current = new mapboxgl.Marker({ draggable: true })
        .setLngLat([lng, lat])
        .addTo(mapRef.current)
    }

    let handleMoveEnd = ({ target }: MapboxEvent) => {
      setIsMoving(false)
      const [lng, lat] = target.getCenter().toArray()
      markerRef.current = new mapboxgl.Marker({ draggable: true })
        .setLngLat([lng, lat])
        .addTo(target)
    }
    let handleMoveStart = () => {
      setIsMoving(true)
      if (markerRef.current) {
        markerRef.current.remove()
      }
    }
    if (mapRef.current) {
      if (isAdding) {
        mapRef.current.on('movestart', handleMoveStart)
        mapRef.current.on('moveend', handleMoveEnd)
      } else {
        markerRef.current?.remove()
        mapRef.current.off('moveend', handleMoveEnd)
        mapRef.current.off('movestart', handleMoveStart)
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.off('movestart', handleMoveStart)
        mapRef.current.off('moveend', handleMoveEnd)
      }
    }
  }, [mapRef, markerRef, isAdding])

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainer.current ?? '',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [INITIAL_LNG, INITIAL_LAT],
        zoom: INITIAL_ZOOM,
      })

      initializeMap(mapRef.current)
      addDataLayer(mapRef.current, locations)
    }
    return () => {
      mapRef?.current?.remove()
    }
  }, [mapRef, locations])

  return (
    <Main>
      <Head>
        <link
          href={process.env.NEXT_PUBLIC_MAPBOXGL_CSS_HREF}
          rel="stylesheet"
        />
      </Head>
      <div className={styles['add-location-button']}>
        <MuiIconButton
          onClick={handleAddLocation}
          size="medium"
          aria-label="add location"
        >
          <>
            {isAdding ? (
              <CloseSharp fontSize="large" />
            ) : (
              <Add fontSize="large" />
            )}
          </>
        </MuiIconButton>
      </div>
      <div
        className={`${styles.location} ${
          isAdding ? styles['location--adding'] : ''
        }`}
      >
        {isMoving && <LocationIcon style={{ fontSize: 40 }} />}
      </div>
      <div className={styles['info-button']}>
        <IconButton
          onToggle={() => {
            setShowInfo((curr) => !curr)
          }}
          size="medium"
          aria-label="add location"
        >
          <HelpIcon fontSize="large" />
        </IconButton>
      </div>
      <div
        className={`${styles['info-form']} ${
          showInfo ? styles['info-form--open'] : ''
        }`}
      >
        {showInfo && (
          <>
            <h1>Title</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Adipisci, nam?
            </p>
          </>
        )}
      </div>
      <div
        id="map"
        ref={mapContainer}
        style={{ height: '100vh', width: '100vw' }}
      />
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
