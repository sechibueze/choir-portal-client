import React from 'react';
import './Footer.scss';
const Footer = () => {
    return ( 
        <div className="footer">
            <p className="copyright">
                <span className="copyright-text">Powered by</span>
                <img src={"./img/ictg-logo.png"} alt="ICTG ID" className="footer-logo" />
            </p>
        </div>
     );
}
 
export default Footer;