import React, {
  ButtonHTMLAttributes,
  MouseEventHandler,
  PropsWithChildren,
  ReactElement,
} from 'react'
import styles from './Button.module.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: MouseEventHandler
}

export default function Button({
  children,
  onClick,
  ...props
}: PropsWithChildren<Props>): ReactElement {
  return (
    <button {...props} className={styles.button} onClick={onClick}>
      {children}
    </button>
  )
}
