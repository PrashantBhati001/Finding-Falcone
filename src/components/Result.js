import React from "react";
import { useLocation,useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from '@mui/material/Button';
import './Result.css';



export default function Result(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const resultData = location.state ? location.state.result : null;
  const timeTaken = location.state ? location.state.timeTaken : null; 

  const handlePlayAgainClick = () => {
    props.resetSelection();
    navigate("/");
  }

  if (!resultData) {
    return <div className="view">No result found!!! 😕</div>;
  }

  return (
    <Card  className="view" variant="outlined" style={{ margin: "20px", padding: "20px" }}>
      <CardContent >
        {resultData.status === "success" ? (
          <>
            <p>Congratulations on finding Falcone!!!</p>
            <p>Total Time Taken: {timeTaken} hours</p> 
            <p>Planet Name: {resultData.planet_name}</p>
            
          </>
        ) : (
          <p className="view"> Falcone Search failed!!!  😕</p>
        )}

        <Button variant="contained" onClick={handlePlayAgainClick}>
          Play Again
        </Button>
        
      </CardContent>
    </Card>
  );
}
