import React from 'react'
import Register from  "../components/registeration-nai/Register"
import NeuronCompo from '../components/NeuronCompo NeuronCompo'
import { Box, Link } from '@mui/material';

function Registration() {
  return (
    <div>
        <NeuronCompo/>
        <Register></Register>
        <Box sx={{ textAlign: 'center', margin: '0 auto',padding:'20px', background:"rgba(4,118,217,0.4)" }}>
      Already have an account? {' '}
      <Link href="/login" sx={{ color: 'rgba(4, 118, 217)', textDecoration: 'none' }}>
        Login
      </Link>
    </Box>
    </div>
  )
}

export default Registration