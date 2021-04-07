import React from "react";
import "./DataCard.scss";
const DataCard = ({ title, message }) => {
  return (
    <div className="stats-card">
      <h2 className="title"> {title} </h2>
      <span className="data-card-info"> {message && message} </span>
    </div>
  );
};

export default DataCard;
