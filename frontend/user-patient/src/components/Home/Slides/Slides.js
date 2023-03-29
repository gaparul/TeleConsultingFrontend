import React from "react";
import Carousel from "react-material-ui-carousel"

import './Slides.css'

import consult from "./SlidesImages/ConsultOnline.jpg"
import getConsultation from "./SlidesImages/getConsultation.jpg"
import Appointments from "./SlidesImages/Appointments.jpg"

import { PersonSearchOutlined } from "@mui/icons-material";
import { Button, Paper, Typography } from "@mui/material";
import { HashLink } from "react-router-hash-link";

const Slides = () => {

    function GetImage(props) {
        return (
            <>
            <Paper>
                <div className="slides-container">
                    <img src={props.item.img} alt=""/>
                    <div className="slides-text tracking-in-expand">
                        <Typography component="h4" variant="h5">
                            {props.item.name}
                        </Typography>
                        <HashLink smooth to="/login#login" classname='text-style'>
                            <Button sx={{mt:2}} variant="contained" className="CheckButton">
                                Login
                                <PersonSearchOutlined></PersonSearchOutlined>
                            </Button>
                        </HashLink>
                    </div>
                </div>
            </Paper>
            </>
        )
    }
    const images= [
        {
            name: "Just a click away",
            img: consult
        },
        {
            name: "Consult with experts online",
            img: getConsultation
        },
        {
            name: "Get easy Appointments",
            img: Appointments
        }
    ]
    return (
        <div>
            <Carousel>
                {
                    images.map((item, i) => <GetImage key = {i} item={item} />)
                }
            </Carousel>

        </div>
    )
};

export default Slides;