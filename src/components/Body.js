import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import Buttons from "./Buttons";


export default function Body(props) {
  const [planetsData, setPlanetsData] = useState([]);
  const [vehiclesData, setVehiclesData] = useState([]);
  const [timeTaken, setTimeTaken] = useState(0);
  const dropDownOptions = {
    options: planetsData
      .map((planet) => planet.name)
      .filter((name) => !props.selectedPlanets.includes(name)),
    getOptionLabel: (option) => option
  };
  

  const fetchVehicleData = async () => {
    try {
      const res = await axios.get("https://findfalcone.geektrust.com/vehicles");
      return res.data;
    } catch (error) {
      console.log("Error fetching Vehicle data:", error);
    }
  };

  const fetchPlanetData = async () => {
    try {
      const res = await axios.get("https://findfalcone.geektrust.com/planets");
      return res.data;
    } catch (error) {
      console.log("Error fetching Planet data:", error);
    }
  };

  
  const handlePlanetSelection = (index, planetName) => {
    const updatedSelectedPlanets = [...props.selectedPlanets];
    updatedSelectedPlanets[index] = planetName;
    props.setSelectedPlanets(updatedSelectedPlanets);
    const selectedPlanet = planetsData.find((planet) => planet.name === planetName);
    const updatedVehicles = vehiclesData.map((vehicle) => {
      if (planetName && vehicle.max_distance < selectedPlanet.distance) {
        return { ...vehicle, disabled: true };
      } else {
        return { ...vehicle, disabled: false };
      }
    });
    setVehiclesData(updatedVehicles);
  };

  const handleVehicleSelection = (index, event) => {
    const selectedVehicleName = event.target.value;
    const selectedVehicle = vehiclesData.find((vehicle) => vehicle.name === selectedVehicleName);

    if (selectedVehicle && selectedVehicle.total_no > 0 && !selectedVehicle.disabled) {
      const updatedSelectedVehicles = [...props.selectedVehicles];
      updatedSelectedVehicles[index] = selectedVehicleName;
      props.setSelectedVehicles(updatedSelectedVehicles);
      const updatedVehicles = vehiclesData.map((vehicle) => {
        if (vehicle.name === selectedVehicleName) {
          return { ...vehicle, total_no: vehicle.total_no - 1 };
        }
        return vehicle;
      });

      setVehiclesData(updatedVehicles);
    }
  };

  const TotalTime = () => {
    let total_time = 0;
    for (let i = 0; i < props.arr.length; i++) {
      const selectedPlanet = planetsData.find((planet) => planet.name === props.selectedPlanets[i]);
      const selectedVehicle = vehiclesData.find((vehicle) => vehicle.name === props.selectedVehicles[i]);

      if (selectedPlanet && selectedVehicle) {
        total_time += selectedPlanet.distance / selectedVehicle.speed;
      }
    }
    return total_time;
  }

  useEffect(() => {
    (async () =>{
      let planetValue = await fetchPlanetData();
      setPlanetsData(planetValue);
      let vehicleValue = await fetchVehicleData();
      setVehiclesData(vehicleValue);
    })()
    
  },[]);

  

  useEffect(() => {
    setTimeTaken(TotalTime());
  }, [props.selectedPlanets, props.selectedVehicles, planetsData, vehiclesData]);

  return (
    
    <Grid container spacing={3} mt={3} >
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardHeader title="Time Taken by Vehicles" />
          <CardContent>
            <p>Total Time: {timeTaken} hours</p>
          </CardContent>
        </Card>
      </Grid>
      {props.arr.map((index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card variant="outlined" >
            <CardHeader title={`Target ${index}`} />
            <CardContent>
              <Stack spacing={2} sx={{ width: 200 }}>
                <Autocomplete
                  {...dropDownOptions}
                  id={`auto-complete-${index}`}
                  autoComplete
                  includeInputInList
                  renderInput={(params) => (
                    <TextField {...params} label="autoComplete" variant="standard" />
                  )}
                  value={props.selectedPlanets[index-1]}
                  onChange={(event,newValue) => {
                    handlePlanetSelection(index-1, newValue);
                  }}
                />
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name={`radio-buttons-group-${index}`}
                    value={props.selectedVehicles[index-1]}
                    onChange={(event) => {
                      handleVehicleSelection(index-1, event);
                    }}
                  >
                    {vehiclesData.map((vehicle) => (
                      <FormControlLabel
                        key={vehicle.name}
                        value={vehicle.name}
                        control={<Radio />}
                        label={`${vehicle.name} (${vehicle.total_no})`}
                        disabled={vehicle.disabled || vehicle.total_no <= 0}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Buttons selectedPlanets={props.selectedPlanets} selectedVehicles={props.selectedVehicles} planets={planetsData} timeTaken={timeTaken}  />
      
    </Grid>
  );
}
