import { IconButton, Menu, MenuItem, Slide } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/MenuSharp'
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
      <div className="menu">
        <IconButton
          style={{
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: 'white',
            borderRadius: 10,
            padding: 8,
          }}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MenuIcon fontSize="large" />
        </IconButton>
        <Menu
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={!!anchorEl}
          onClose={handleClose}
          TransitionComponent={Slide}
        >
          {menu.map((item) => (
            <MenuItem key={item.title} onClick={handleClose}>
              <Link href={item.href}>{item.title}</Link>
            </MenuItem>
          ))}
        </Menu>
      </div>
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
