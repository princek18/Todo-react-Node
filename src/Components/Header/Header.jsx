import { Button } from '@mui/material'
import React from 'react'
import './Header.css'

export const Header = () => {
  const logout = () => {
    localStorage.removeItem('authToken');
    window.location.reload();
  }
  return (
    <header className='head'>
      <div className='head-div'>
      <p className='para' style={localStorage.getItem('authToken')?{margin: "0px 0px"}: {}}> Todo App</p>
      {localStorage.getItem('authToken')?
        <Button
              onClick={logout}
              style={{marginLeft: "auto"}}
              variant="contained"
            >
              Logout
            </Button>:""}
      </div>

    </header>
  )
}
