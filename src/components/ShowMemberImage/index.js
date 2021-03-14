import React, { Fragment } from "react";
import "./ShowMemberImage.scss";

const ShowMemberImage = ({ imageUrl, openModalBox }) => {
  // useEffect(, [memberImageRequest])
  const img = {
    width: "190px",
    height: "190px",
    borderRadius: "50%",
  };
  return (
    <Fragment>
      <div className="image-box">
        {imageUrl ? (
          <img
            style={img}
            src={imageUrl}
            alt="member view"
            className="profile-image"
          />
        ) : (
          <span className="profile-image fas fa-user fa-5x" />
        )}
        <span
          className="fas fa-plus fa-2x edit-image-icon"
          onClick={() => openModalBox()}
        />
      </div>
    </Fragment>
  );
};

export default ShowMemberImage;
