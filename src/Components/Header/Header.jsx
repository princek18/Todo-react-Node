import { Button } from '@mui/material'
import React from 'react'
import { logout } from '../../utlis/utils'
import './Header.css'

export const Header = () => {
  return (
    <header className='head'>
      <div className='head-div'>
      <p className='para' style={localStorage.getItem('authToken')?{margin: "0px 0px"}: {}}> Todo App</p>
      {localStorage.getItem('authToken')?
        <div style={{marginLeft: "auto"}}>
      {localStorage.getItem('name')}
        <Button
              onClick={logout}
              style={{marginLeft: "10px"}}
              variant="contained"
            >
              Logout
            </Button>
            </div>:""}
      </div>

    </header>
  )
}
