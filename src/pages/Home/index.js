import React, { Fragment } from "react";
import Navbar from "../../components/Navbar";
// import Footer from '../../components/Footer';
import "./Home.scss";
import LoginForm from "../../components/LoginForm";
const Home = () => {
  return (
    <Fragment>
      <Navbar />
      <div
        className="container"
        style={{
          backgroundImage: "./img/ft-choir.jpg",
        }}
      >
        <LoginForm />
      </div>
      {/* <Footer /> */}
    </Fragment>
  );
};

export default Home;
