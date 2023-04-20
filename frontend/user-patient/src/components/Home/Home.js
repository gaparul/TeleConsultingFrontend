import React from 'react'
import './Home.css'
import Slides from './Slides/Slides'
import Header from "../Bar/Header/Header"
const Home = () => {
    return (
        <div id="home">
            <Header></Header>
            <Slides></Slides>
        </div>
    )
};

export default Home;