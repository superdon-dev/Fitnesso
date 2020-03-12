import React from 'react'
import { NavLink } from 'react-router-dom';
import { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
const MenuItem = (props) => {
    return (
        <NavItem>
                <NavIcon>
                    <NavLink to={props.route}><i className={props.icon} style={{ fontSize: '1.5em' }} /></NavLink>
                </NavIcon>
                <NavText>
                    <NavLink to={props.route}>{props.title}</NavLink>
                </NavText>
        </NavItem>
    )
}

export default MenuItem