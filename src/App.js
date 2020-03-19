import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ROUTES } from './consts/routes';
import { Route, Switch, Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './containers/Header/Header';
import Menu from './components/Menu/Menu';
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
    if(this.props.isAuthenticated){
      this.props.userFetch(this.props.userId);
    }
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
          {this.props.isAuthenticated ? <Header /> : null}
          {routes}
        </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    userId: state.auth.userId,
  }
}
const mapDispatchToProps = dispatch => {
  return{
    onTryAutoSignin: () => dispatch(actions.authCheckState()),
    userFetch: (userId) => dispatch(actions.userFetch(userId)),
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
