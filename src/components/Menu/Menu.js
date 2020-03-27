import React, { Component } from 'react'
import { connect } from 'react-redux';
import MenuItem from './MenuItem/MenuItem';
import './Menu.css';
import SideNav from '@trendmicro/react-sidenav';

class Menu extends Component {
  render() {
    return (
        <SideNav>
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="Home">
            <MenuItem title="Home" icon="fa fa-home" route="/" />
            {(this.props.isAuthenticated && this.props.userType==="Practitioner") ?
            <React.Fragment>
                <MenuItem title="Training" icon="fa fa-dumbbell" route="/training" />
                <MenuItem title="Diet" icon="fa fa-apple-alt" route="/diet" />
                <MenuItem title="Analysis" icon="fa fa-chart-area" route="/analysis" />
                <MenuItem title="Chat" icon="fa fa-comments" route="/chat" />
            </React.Fragment>
            : null}
            {(this.props.isAuthenticated && this.props.userType==="Trainer") ?
            <React.Fragment>
                <MenuItem title="Add Training" icon="fa fa-dumbbell" route="/add-training" />
                <MenuItem title="Chat" icon="fa fa-comments" route="/chat" />
            </React.Fragment>
            : null}
            {!this.props.isAuthenticated
                ? <MenuItem title="Login" icon="fa fa-sign-in" route="/auth" />
                : <MenuItem title="Logout" icon="fa fa-sign-out" route="/logout" /> 
            }
        </SideNav.Nav>
        </SideNav>
    )
  }
}
const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.token !== null,
        userType: state.user.userType,
    }
}

export default connect(mapStateToProps)(Menu)
