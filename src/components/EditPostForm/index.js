import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useForm } from "../../hooks";
import { editPost } from "../../_actions/postActions";
import Alert from "../Alert";
import { EDIT_POST_FAIL } from "../../_actions/types";
const EditPostForm = ({ post, editPost, editPostDataRequest }) => {
  const { state, onChangeHandler: handleChange } = useForm({
    _id: post && post._id ? post._id : "",
    key: post && post._id ? post._id : "",
    title: post && post.title ? post.title : "",
    content: post && post.content ? post.content : "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    editPost(state);
  };

  const { title, content } = state;
  return (
    <Fragment>
      <div className="add-post">
        <p className="text text-primary">Edit posts</p>
        <Alert origin={EDIT_POST_FAIL} />
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              name="title"
              onChange={handleChange}
              value={title}
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              rows="7"
              cols="20"
              name="content"
              value={content}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              className="btn btn-dark"
              type="submit"
              value={`${editPostDataRequest ? "loading" : "Update Post"}`}
            />
          </div>
        </form>
      </div>
    </Fragment>
  );
};

EditPostForm.propTypes = {
  editPost: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  editPostDataRequest: state.posts.editPostDataRequest,
});
export default connect(mapStateToProps, { editPost })(EditPostForm);
