import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPosts } from "../../_actions/postActions";
import PostCard from "../PostCard";

import "./PostFeed.scss";
const PostFeed = ({ getPosts, posts, postsRequest }) => {
  const _getPosts = () => getPosts({ count: 2 });
  useEffect(_getPosts, [_getPosts]);

  return (
    <Fragment>
      <div className="post-wrapper">
        {posts.length === 0 && postsRequest ? (
          <h2>loading...</h2>
        ) : posts.length > 0 && !postsRequest ? (
          posts.map((post, index) => <PostCard post={post} key={index} />)
        ) : (
          <h2>Empty </h2>
        )}
      </div>
    </Fragment>
  );
};
PostFeed.propTypes = {
  getPosts: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  posts: state.posts.posts,
  postsRequest: state.posts.postsRequest,
});
export default connect(mapStateToProps, { getPosts })(PostFeed);
