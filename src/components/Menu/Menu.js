import React from 'react'
import './Menu.css';

import { NavLink } from 'react-router-dom';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

const Menu = () => {
    return (
        <SideNav>
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="home">
            <NavItem>
                <NavIcon>
                    <NavLink to="/"><i className="fa fa-home" style={{ fontSize: '1.5em' }} /></NavLink>
                </NavIcon>
                <NavText>
                    <NavLink to="/">Home</NavLink>
                </NavText>
            </NavItem>
            <NavItem>
                <NavIcon>
                    <NavLink to="/training"><i className="fa fa-dumbbell" style={{ fontSize: '1.5em' }} /></NavLink>
                </NavIcon>
                <NavText>
                    <NavLink to="/training">Training</NavLink>
                </NavText>
            </NavItem>
            <NavItem>
                <NavIcon>
                    <NavLink to="/diet"><i className="fa fa-apple-alt" style={{ fontSize: '1.5em' }} /></NavLink>
                </NavIcon>
                <NavText>
                    <NavLink to="/diet">Diet</NavLink>
                </NavText>
            </NavItem>
            <NavItem>
                <NavIcon>
                    <NavLink to="/analysis"><i className="fa fa-chart-area" style={{ fontSize: '1.5em' }} /></NavLink>
                </NavIcon>
                <NavText>
                    <NavLink to="/analysis">Analysis</NavLink>
                </NavText>
            </NavItem>
            <NavItem>
                <NavIcon>
                    <NavLink to="/chat"><i className="fa fa-comments" style={{ fontSize: '1.5em' }} /></NavLink>
                </NavIcon>
                <NavText>
                    <NavLink to="/chat">Chat</NavLink>
                </NavText>
            </NavItem>
        </SideNav.Nav>
        </SideNav>
    )
}

export default Menu
