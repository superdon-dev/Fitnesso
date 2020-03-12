import React from 'react'
import MenuItem from './MenuItem/MenuItem';
import './Menu.css';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { NavLink } from 'react-router-dom';

const Menu = () => {
    return (
        <SideNav>
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="home">
            <MenuItem title="Home" icon="fa fa-home" route="/" />
            <MenuItem title="Training" icon="fa fa-dumbbell" route="/training" />
            <MenuItem title="Diet" icon="fa fa-apple-alt" route="/diet" />
            <MenuItem title="Analysis" icon="fa fa-chart-area" route="/analysis" />
            <MenuItem title="Chat" icon="fa fa-comments" route="/chat" />
        </SideNav.Nav>
        </SideNav>
    )
}

export default Menu
