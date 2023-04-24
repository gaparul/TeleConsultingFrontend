import React from 'react'
import PropTypes from "prop-types";

AvailableDoctors.propTypes = {
    category: PropTypes.string
  };

export default function AvailableDoctors ({category}){
    console.log(category)
  return (
    <div>AvailableDoctors</div>
  )
}