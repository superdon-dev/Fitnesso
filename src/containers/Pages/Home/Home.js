import React from 'react'
import './Home.css';
import Card from '../../../components/Card/Card';
const Home = () => {
    return (
        <div className="Home">
            <h3>Home</h3>
            <Card training="Cardio" timing="2020-03-18T14:14:00.988Z" place="Project Fit"/>
            <Card training="Chest" timing="2020-03-18T15:17:00.988Z" place="Project Fit"/>
        </div>
    )
}

export default Home
