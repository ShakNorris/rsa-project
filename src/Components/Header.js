import React from 'react'
import './Header.css'
import GitHubIcon from '@mui/icons-material/GitHub';
import { Button } from '@mui/material';

function Header() {
  return (
    <div className='header'>
        <div className='head-items'>
            <img className="logo" src="/Crypt.png" alt="Project Logo" />
            <h1>RSA-PROJECT</h1>
        </div>
        <div className='link'>
          <Button variant="contained" startIcon={<GitHubIcon/>} href="https://github.com/ShakNorris/rsa-project"
          target="#"
          style={{
            height: 50,
            backgroundColor:'#60b0f4',
            fontWeight: "bold",
          }}>GitHub</Button>
        </div>
    </div>
  )
}

export default Header