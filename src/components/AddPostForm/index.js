import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useForm } from "../../hooks";
import { createPost } from "../../_actions/postActions";
import Alert from "../Alert";
import { CREATE_POST_FAIL } from "../../_actions/types";
const AddPostForm = ({ createPost, newPostRequest }) => {
  const { state, onChangeHandler: handleChange } = useForm({
    title: "",
    content: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(state);
  };

  const { title, content } = state;
  return (
    <Fragment>
      <div className="add-post">
        <p className="text text-primary">Say something today</p>
        <Alert origin={CREATE_POST_FAIL} />
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              name="title"
              onChange={handleChange}
              value={title}
              placeholder="Give this post a title"
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              rows="7"
              cols="20"
              placeholder="Start typing...or paste your content"
              name="content"
              value={content}
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              className="btn btn-dark"
              type="submit"
              value={`${newPostRequest ? "loading" : "Create Post"}`}
            />
          </div>
        </form>
      </div>
    </Fragment>
  );
};

AddPostForm.propTypes = {
  createPost: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  newPostRequest: state.posts.newPostRequest,
});
export default connect(mapStateToProps, { createPost })(AddPostForm);
