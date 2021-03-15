import { IconButton, Menu, MenuItem, Slide } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/MenuSharp'
import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'

interface Props {}

type MenuItem = {
  title: string
  href: string
}

const menu: MenuItem[] = [
  {
    title: 'home',
    href: '/',
  },
  {
    title: 'profile',
    href: '/profile',
  },
]

const Main: React.FC<Props> = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className="container">
      <div className="child-container">{children}</div>
      <style jsx>{`
        .container {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
        }
        .child-container {
          position: absolute;
          top: 0;
          left: 0;
        }
        .menu {
          z-index: 1;
          position: absolute;
          top: 10px;
          left: 10px;
        }
      `}</style>
    </div>
  )
}

export default Main
