import Head from 'next/head'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { GetStaticProps } from 'next'
import mapboxgl, { MapboxEvent } from 'mapbox-gl'
import Main from '../layouts/Main'
import { ILocation } from '../types/graphql'
import connectToDb from '../db/utils/connectToDb'
import Locator from '../components/Locator'
import initializeMap from '../components/Map/helpers/initializeMap'
import addDataLayer from '../lib/mapBoxUtils/addDataLayer'
import styles from './index.module.css'
import { AddLocation, CloseSharp, Add } from '@material-ui/icons'
import HelpIcon from '@material-ui/icons/Help'
import { IconButton } from '../components/IconButton'
import LocationIcon from '../components/LocationIcon/LocationIcon'
import { Map } from '../components/Map'
import { DataPoint } from '../components/Map/Map'
import { FoldOutMenu } from '../components/FoldOutMenu'
import { ToggleButton } from '../components/ToggleButton'
import { SlideIn } from '../components/SlideIn'
import { Button } from '../components/Button'
import AddLocationForm from '../components/Forms/AddLocationForm'

type Props = {
  locations: ILocation[]
}

function HomePage({ locations }: Props) {
  const [showInfo, setShowInfo] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)

  const data: DataPoint[] = useMemo(
    () =>
      locations.map((location) => ({
        ...location,
        id: location._id,
        description: 'Hello world...',
        coordinates: [
          +location.coordinates.longitude,
          +location.coordinates.latitude,
        ],
      })),
    [locations]
  )

  const onAddDataPoint = () => {
    console.log('adding data point!')
  }

  const handlePlaceMarker = () => {
    console.log('handlePlaceMarker')
  }

  return (
    <Main>
      <div className={styles.controlsWrapper}>
        <div className={styles['add-location-button']}>
          <ToggleButton
            onToggle={() => {
              setIsConfirmed(false)
              setIsAdding((curr) => !curr)
            }}
          />
        </div>
        <SlideIn active={isAdding && !isConfirmed}>
          <Button
            onClick={() => {
              setIsConfirmed(true)
              setIsAdding(true)
            }}
          >
            Confirm location
          </Button>
        </SlideIn>
      </div>
      <div
        className={`${styles.mapWrapper} ${isConfirmed ? styles.slideUp : ''}`}
      >
        <Map
          interactive={!isConfirmed}
          data={data}
          isAddingDataPoint={isAdding}
        />
      </div>
      <div className={`${styles.form} ${isConfirmed ? styles.formSlide : ''}`}>
        <h1>New location</h1>
        <AddLocationForm />
      </div>
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
