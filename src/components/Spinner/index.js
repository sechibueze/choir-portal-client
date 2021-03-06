import React from 'react';
import "./Spinner.scss";
import loader from "./loading.gif";
const Spinner = () => {

    return ( 
        <div className="loader">
            {/* <h1> Loading ...</h1> */}
            <img className="loader" src={loader} alt="loading placeholde" />
            {/* <span> Wait a moment</span> */}
        </div>
     );
}
 
export default Spinner;