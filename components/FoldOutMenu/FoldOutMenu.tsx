import React, { ReactElement } from 'react'
import styles from './FoldOutMenu.module.css'

interface Props {
  onConfirm: () => void
  onCancel: () => void
}

export default function FoldOutMenu({
  onCancel,
  onConfirm,
}: Props): ReactElement {
  return (
    <div className={styles.container}>
      <button onClick={onCancel}>Open</button>
      <button onClick={onConfirm}>Accept</button>
    </div>
  )
}
