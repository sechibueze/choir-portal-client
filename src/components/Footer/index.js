import React from "react";
import "./Footer.scss";
import ictgLogo from "../../assets/images/ictg-logo.png";
const Footer = ({ sticky }) => {
  const styles = {
    position: "fixed",
    bottom: 0,
    width: "100%",
  };
  return (
    <div className="footer" style={sticky ? { ...styles } : {}}>
      <p className="copyright">
        <span className="copyright-text">Powered by</span>
        <a
          href="https://ftwinnersictg.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={ictgLogo} alt="ICTG ID" className="copyright-logo" />
        </a>
        <span className="copyright-text">Canaanland, Ota</span>
      </p>
    </div>
  );
};

export default Footer;
