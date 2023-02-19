import React from "react";
import Carousel from "react-material-ui-carousel"

import './Slides.css'

import consult from "./SlidesImages/ConsultOnline.jpg"
import getConsultation from "./SlidesImages/getConsultation.jpg"
import Appointments from "./SlidesImages/Appointments.jpg"
import { Paper, Typography } from "@mui/material";

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
                    </div>
                </div>
            </Paper>
            </>
        )
    }
    const images = [
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