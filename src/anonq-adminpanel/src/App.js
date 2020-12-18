import React from 'react';
import './App.css';
import {
  Switch,
  Route,
} from "react-router-dom";
import AdminPanel from './pages/AdminPanel';



function App() {
  return (
    <div className="App">
      <Switch>
      <Route exact path='/' component={AdminPanel}/>
    </Switch>
    </div>
  );
}


export default App;
