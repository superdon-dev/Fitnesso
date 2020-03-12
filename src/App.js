import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ROUTES } from './consts/routes';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import Home from './components/Home/Home';
import Training from './components/Training/Training';
import Diet from './components/Diet/Diet';
import Analysis from './components/Analysis/Analysis';
import Chat from './components/Chat/Chat';

function App() {
  return (
    <Router>
      <div className="App">
        <Menu />
        <Route exact path={ROUTES.HOME} component={Home}></Route>
        <Route exact path={ROUTES.TRAINING} component={Training}></Route>
        <Route exact path={ROUTES.DIET} component={Diet}></Route>
        <Route exact path={ROUTES.ANALYSIS} component={Analysis}></Route>
        <Route exact path={ROUTES.CHAT} component={Chat}></Route>
      </div>
    </Router>
  );
}

export default App;
