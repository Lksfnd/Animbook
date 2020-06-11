import React from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import ViewNav from './components/ViewNav';
import ViewAnimTrigonometricWaves from './animations/TrigonometricWaves/ViewAnimTrigonometricWave';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={ViewNav}/>

        {/* Animations */}
        <Route exact path="/anim/trigonometric-waves" component={ViewAnimTrigonometricWaves} />
      </BrowserRouter>
    </div>
  );
}

export default App;
