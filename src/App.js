import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ROUTES } from './consts/routes';
import { Route, Switch, Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import Menu from './components/Menu/Menu';
import Container from './containers/Container/Container';
import Home from './containers/Pages/Home/Home';
import Training from './containers/Pages/Training/Training';
import Diet from './containers/Pages/Diet/Diet';
import Analysis from './containers/Pages/Analysis/Analysis';
import Chat from './containers/Pages/Chat/Chat';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/exports';

class App extends Component{
  componentDidMount(){
    this.props.onTryAutoSignin();
  }
  render () {
    let routes = (
      <Switch>
        <Route exact path={ROUTES.HOME} component={Home}></Route>
        <Route exact path={ROUTES.AUTH} component={Auth}></Route>
        <Redirect to="/" />
      </Switch>
    );
    if(this.props.isAuthenticated){
      routes = (
      <Switch>
          <Route exact path={ROUTES.HOME} component={Home}></Route>
          <Route exact path={ROUTES.TRAINING} component={Training}></Route>
          <Route exact path={ROUTES.DIET} component={Diet}></Route>
          <Route exact path={ROUTES.ANALYSIS} component={Analysis}></Route>
          <Route exact path={ROUTES.CHAT} component={Chat}></Route>
          <Route exact path={ROUTES.LOGOUT} component={Logout}></Route>
      </Switch>
      );
    }
    return (
        <div className="App">
          <Menu />
          {this.props.isAuthenticated ? <Container /> : null}
          {routes}
        </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
}
const mapDispatchToProps = dispatch => {
  return{
    onTryAutoSignin: () => dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
