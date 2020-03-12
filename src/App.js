import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ROUTES } from './consts/routes';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import Home from './containers/Pages/Home/Home';
import Training from './containers/Pages/Training/Training';
import Diet from './containers/Pages/Diet/Diet';
import Analysis from './containers/Pages/Analysis/Analysis';
import Chat from './containers/Pages/Chat/Chat';
import Auth from './containers/Auth/Auth';

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
        <Route exact path={ROUTES.AUTH} component={Auth}></Route>
      </div>
    </Router>
  );
}

export default App;
