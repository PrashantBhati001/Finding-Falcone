import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";


export default function Header(props) {
  const navigate = useNavigate();

  const handleReset=()=>{

    window.location.reload(false);
    
  }

  const goToHomepage = () => {
    props.resetSelection();
    navigate("/" );
  };
  return (
    <Box>
      <AppBar position="static" style={{ background: '#a9fc03' }}>
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <div style={{ color: '#000000', fontSize:'25px' }}>Finding Falcone </div>
          <div>
            <Button   onClick={handleReset} variant="outlined" color="secondary" >RESET</Button>
            <span style={{ marginRight: '40px' }}></span>
            <Button   onClick={goToHomepage} variant="outlined"  color="secondary" >HOME</Button>
            
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}