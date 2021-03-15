import React, { PropsWithChildren, ReactElement } from 'react'
import styles from './SlideIn.module.css'

interface Props {
  active?: boolean
}

export default function SlideIn({
  children,
  active = false,
}: PropsWithChildren<Props>): ReactElement {
  return (
    <div className={`${styles.container} ${active ? styles.active : ''}`}>
      {children}
    </div>
  )
}
