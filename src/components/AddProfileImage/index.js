import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateMemberImage } from "../../_actions/memberActions";
import Alert from "../Alert";
import { MEMBER_IMAGE_FAIL } from "../../_actions/types";
const AddProfileImage = ({
  imageUrl,
  memberImageRequest,
  memberImageData,
  updateMemberImage,
}) => {
  const [data, setData] = useState({ image: imageUrl ? imageUrl : "" });

  const handleChange = ({ target }) => {
    setData((prev) => ({
      ...prev,
      [target.name]: target.files[0],
    }));
  };
  const updateData = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("image", data.image);
    updateMemberImage(fd);
  };
  return (
    <Fragment>
      <section className="section">
        <header className="section-header">
          <h3 className="title"> Update Image</h3>
        </header>
        <form
          className="form"
          onSubmit={updateData}
          encType="multipart/form-data"
        >
          <Alert origin={MEMBER_IMAGE_FAIL} />
          <div className="form-group">
            <small style={{ fontSize: ".8rem" }}>
              {" "}
              Ideal image dimension: 195px by 195px{" "}
            </small>
            <label htmlFor="image"> Upload your image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              id="image"
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-sm btn-primary fa fa-check">
            {memberImageRequest ? "processing..." : "Update Image Data"}
          </button>
        </form>
      </section>
    </Fragment>
  );
};

AddProfileImage.propTypes = {
  updateMemberImage: PropTypes.func.isRequired,
  // setAlert: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
  imageUrl: state.auth.currentMember.imageUrl,
  memberImageData: state.members.memberImageData,
  memberImageRequest: state.members.memberImageRequest,
});
export default connect(mapStateToProps, { updateMemberImage })(AddProfileImage);
