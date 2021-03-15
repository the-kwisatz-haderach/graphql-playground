import React, { ReactElement } from 'react'
import { DataPoint } from '../../Map'
import styles from './Tooltip.module.css'

interface Props {
  data: DataPoint
  onClose?: () => void
}

export default function Tooltip({ data, onClose }: Props): ReactElement {
  return (
    <div className={styles.container}>
      <div className={styles.closeButton} onClick={onClose}>
        <i className="fas fa-times" />
      </div>
      <div>
        <h1>{data.name}</h1>
        <p>{data.description}</p>
      </div>
    </div>
  )
}
