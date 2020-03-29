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
import AddTraining from './containers/Pages/Training/AddTraining/AddTraining';
import PreviewTraining from './containers/Pages/Training/PreviewTraining/PreviewTraining';
import Chat from './containers/Pages/Chat/Chat';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/exports';

class App extends Component{
  componentDidMount(){
    this.props.onTryAutoSignin();
  }
  UNSAFE_componentWillReceiveProps(newProps){
    if(this.props.userId !== newProps.userId && newProps.userId !== null){
      this.props.checkUserType(newProps.userId);
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
    if(this.props.isAuthenticated && this.props.userType==="Practitioner"){
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
    if(this.props.isAuthenticated && this.props.userType==="Trainer"){
      routes = (
        <Switch>
          <Route exact path={ROUTES.HOME} component={Home}></Route>
          <Route exact path={ROUTES.ADDTRAINING} component={AddTraining}></Route>
          <Route exact path={ROUTES.CHAT} component={Chat}></Route>
          <Route exact path={ROUTES.LOGOUT} component={Logout}></Route>
          <Route exact path={ROUTES.PREVIEWTRAINING} component={PreviewTraining}></Route>
        </Switch>
      )
    }
    return (
        <div className="App">
          <Menu />
          {(this.props.isAuthenticated && this.props.userType!=='') ? <Header /> : null}
          {routes}
        </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    userId: state.auth.userId,
    userType: state.user.userType,
  }
}
const mapDispatchToProps = dispatch => {
  return{
    checkUserType: (userId) => dispatch(actions.checkUserType(userId)),
    onTryAutoSignin: () => dispatch(actions.authCheckState()),
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
