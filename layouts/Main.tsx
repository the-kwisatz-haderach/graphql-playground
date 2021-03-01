import { Button, Menu, MenuItem } from '@material-ui/core'
import React, { useState } from 'react'

interface Props {}

const Main: React.FC<Props> = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    console.log(e)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className="container">
      <div className="menu">
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          Open Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
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
          top: 50;
          left: 50;
        }
      `}</style>
    </div>
  )
}

export default Main
