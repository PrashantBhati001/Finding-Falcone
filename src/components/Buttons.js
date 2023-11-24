import React from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export default function Buttons(props) {
  
  const navigate = useNavigate();

  const getTokenForSearch = async () => {
    try {
      const res = await axios.post('https://findfalcone.geektrust.com/token', {}, {
        headers: {
          Accept: 'application/json',
        },
      });
      return res.data.token;
    } catch (error) {
      console.log('Error fetching token:', error);
      return null;
    }
  };

  const isDisabled = props.selectedPlanets.some((planet) => planet === null) || props.selectedVehicles.some((vehicle) => vehicle === null);

  const handleSearch = async () => {
    if (!isDisabled) {
      let token = await getTokenForSearch();
      if (token) {
        findQueenFalcone(token, props.selectedPlanets, props.selectedVehicles,props.timeTaken);
      }
    } 
  };

  const findQueenFalcone = async (token, selectedPlanets, selectedVehicles, timeTaken) => {
  
    const requestBody = {
      token: token,
      planet_names: selectedPlanets,
      vehicle_names: selectedVehicles,
    };
  
    try {
      const res = await axios.post('https://findfalcone.geektrust.com/find', requestBody, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
  
      const result = res.data;
      if (result) {
        navigate("/result", { state: { result, timeTaken } });
      } 
    } catch (error) {
      console.log('Error finding Queen Falcone:', error);
    }
  }

  return (
    <>
      <Button variant="contained" style={{ borderRadius: "25px", margin: '0 auto', marginTop: "40px", marginBottom: "30px" }} onClick={handleSearch} disabled={isDisabled}>FIND FALCONE</Button>
    </>
  )
}
