import React, { PropsWithChildren, ReactElement, useState } from 'react'
import { IconButton as MuiIconButton, IconButtonProps } from '@material-ui/core'
import styles from './IconButton.module.css'

interface Props extends IconButtonProps {
  onToggle: () => void
}

export default function IconButton({
  children,
  onToggle,
  ...props
}: PropsWithChildren<Props>): ReactElement {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <MuiIconButton
      {...props}
      className={`${styles.button} ${isOpen ? styles.active : ''}`}
      size="medium"
      onClick={() => {
        setIsOpen((curr) => !curr)
        onToggle()
      }}
    >
      {children}
    </MuiIconButton>
  )
}
