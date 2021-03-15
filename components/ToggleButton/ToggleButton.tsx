import React, { ReactElement, useState } from 'react'
import styles from './ToggleButton.module.css'

interface Props {
  onToggle: () => void
  initialState?: boolean
}

export default function ToggleButton({
  onToggle,
  initialState = false,
}: Props): ReactElement {
  const [active, setActive] = useState(initialState)

  const toggle = () => {
    setActive((curr) => !curr)
    onToggle()
  }

  return (
    <div
      suppressHydrationWarning
      className={`${styles.icon} ${active ? styles.active : ''}`}
      onClick={toggle}
    >
      <i className="fas fa-times" />
    </div>
  )
}
