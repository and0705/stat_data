import React from "react";
import { Link } from "react-router-dom";
import logo from "../../logo.svg";
import "./Home.scss";

const Home = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hi I'm Danny!</p>
        <Link to="/chart">Go to the chart >>></Link>
      </header>
    </div>
  );
};

export default Home;
