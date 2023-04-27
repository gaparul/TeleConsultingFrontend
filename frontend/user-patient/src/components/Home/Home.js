import React from "react";
import "./Home.css";
import Slides from "./Slides/Slides";
import Header from "../Bar/Header/Header";
import Footer from "../Bar/Footer";
import Flow from "./Flow/Flow";
const Home = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("patient");
  localStorage.removeItem("appointment");
  return (
    <div id="home">
      <Header></Header>
      <Slides></Slides>
      <Flow></Flow>
      <Footer></Footer>
    </div>
  );
};

export default Home;
