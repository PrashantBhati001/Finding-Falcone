import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import React, {useState } from 'react';
import Result from './components/Result';
import Footer from './components/Footer';
import Body from './components/Body';


function App() {
  const arr = [1, 2, 3, 4];
  const initialSelectPlanets = Array.apply(null, Array(4)).map(function() { return null });
  const initialSelectVehicles = Array.apply(null, Array(4)).map(function() { return null });
  const [selectedPlanets, setSelectedPlanets] = useState(Array.apply(null, Array(4)).map(function() { return null }));
  const [selectedVehicles, setSelectedVehicles] = useState(Array.apply(null, Array(4)).map(function() { return null }));

  

  const resetSelection = () => {
    setSelectedPlanets(initialSelectPlanets);
    setSelectedVehicles(initialSelectVehicles);
    
  };

  return (
    <div className="App">
      <React.StrictMode>
        <Router>
        <Header resetSelection={resetSelection}/>
          <Routes>
            <Route path="/" element={
              <Body
                selectedPlanets={selectedPlanets}
                selectedVehicles={selectedVehicles}
                setSelectedPlanets={setSelectedPlanets}
                setSelectedVehicles={setSelectedVehicles}
                resetSelection={resetSelection}
                arr ={arr}
              />} 
            />
            <Route path="/result" element={<Result resetSelection={resetSelection} />} />
          </Routes>
          <Footer />
        </Router>
        
      </React.StrictMode>
    </div>
  );
}

export default App;
