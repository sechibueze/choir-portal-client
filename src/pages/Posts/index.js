import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import PropTypes from "prop-types";
// import moment from 'moment';
import AuthContainer from "../../components/AuthContainer";
import {
  getPosts,
  deletePosts,
  resetPostData,
} from "../../_actions/postActions";
import Modal from "../../components/Modal";
import AddPostForm from "../../components/AddPostForm";
import EditPostForm from "../../components/EditPostForm";

import { postColumns } from "../../TableColumns";
import Alert from "../../components/Alert";
import {
  CREATE_POST_SUCCESS,
  DELETE_POST_FAIL,
  DELETE_POST_SUCCESS,
  EDIT_POST_SUCCESS,
} from "../../_actions/types";
import Spinner from "../../components/Spinner";
import "react-data-table-component-extensions/dist/index.css";

const Posts = ({
  getPosts,
  resetPostData,
  deletePosts,
  posts,
  postsRequest,
  newPost,
  editPostData,
  noPostData,
  noPostDataRequest,
  editPostDataRequest,
}) => {
  const [newPostState, setNewPostState] = useState(false);
  const [editPostState, setEditPostState] = useState(false);
  const [selection, setSelection] = useState({});
  const [toggledClearRows, setToggledClearRows] = useState(false);

  const getColumnData = () => postColumns;
  const columns = useMemo(getColumnData, []);

  useEffect(getPosts, [editPostData, getPosts, noPostData, newPost]);

  const dismissAndResetData = () => {
    setNewPostState(false);

    setEditPostState(false);
    resetPostData();
  };

  const closeModalBox = () => {
    if (newPost || editPostData) dismissAndResetData();
  };
  const _closeModalBox = () => closeModalBox();
  useEffect(_closeModalBox, [newPost, editPostData, _closeModalBox]);
  const clearRowSelection = () => {
    if (editPostDataRequest === false || noPostDataRequest === false)
      setToggledClearRows(!toggledClearRows);
  };
  const _clearRowSelection = () => clearRowSelection();
  useEffect(_clearRowSelection, [
    editPostDataRequest,
    noPostDataRequest,
    _clearRowSelection,
  ]);

  const handleDelete = (records) => {
    if (window.confirm(`You will delete ${records.length} posts`)) {
      const deleteList = {
        posts: records.map((r) => r._id),
      };
      deletePosts(deleteList);
    }
  };
  const DeletePostsButton = ({ selection }) => (
    <span
      className="context-action"
      onClick={() => handleDelete(selection.selectedRows)}
    >
      {" "}
      <span className="fas fa-user-minus" />
      Delete
    </span>
  );

  const EditPostButton = () => {
    return (
      <span className="context-action" onClick={() => setEditPostState(true)}>
        <span className="fas fa-user-edit" /> Edit
      </span>
    );
  };

  const TableContextComponents = ({ selection, ...props }) => {
    const tableOptions = {
      deleteButton: <DeletePostsButton key={2} selection={selection} />,
      editButton: <EditPostButton key={1} />,
    };
    if (selection.selectedCount === 1) {
      return [tableOptions.editButton, tableOptions.deleteButton];
    }
    return [tableOptions.deleteButton];
  };

  return (
    <AuthContainer>
      {newPostState && (
        <Modal
          visible={newPostState}
          dismiss={() => dismissAndResetData()}
          component={<AddPostForm />}
        />
      )}

      {editPostState && (
        <Modal
          visible={editPostState}
          dismiss={() => dismissAndResetData()}
          component={<EditPostForm post={selection.selectedRows[0]} />}
        />
      )}
      <div>
        <div className="context-box">
          <span
            className="context-action"
            onClick={() => setNewPostState(true)}
          >
            {" "}
            <span className="fas fa-comments" /> Add Post{" "}
          </span>
          {/* <span
            className="context-action"
            onClick={() => setMembersUploadState(true)}
          >
            {" "}
            <span className="fas fa-paperclip" /> Upload Members{" "}
          </span> */}
        </div>
        {/* {deleteMemberRequest && <span className=""> Deleting members...</span>}
        {toggleAdminRequest && (
          <span className=""> Updating member role...</span>
        )} */}
        <Alert origin={CREATE_POST_SUCCESS} />
        <Alert origin={DELETE_POST_FAIL} />
        <Alert origin={DELETE_POST_SUCCESS} />
        <Alert origin={EDIT_POST_SUCCESS} />

        {posts.length === 0 && postsRequest ? (
          <Spinner message={"Fetching posts"} />
        ) : (
          <DataTableExtensions
            columns={columns}
            data={posts}
            exportHeaders={true}
            filterPlaceholder={"Type your search..."}
          >
            <DataTable
              columns={columns}
              data={posts}
              title={`FTC posts (${posts.length})`}
              // noHeader
              contextMessage={{
                singular: "post",
                plural: "posts",
                message: "selected",
              }}
              contextActions={<TableContextComponents selection={selection} />}
              // contextComponent={true}
              striped={true}
              highlightOnHover={true}
              defaultSortField="firstname"
              defaultSortAsc={false}
              pagination
              selectableRows={true}
              selectableRowsHighlight={true}
              onSelectedRowsChange={setSelection}
              clearSelectedRows={toggledClearRows}

              // noDataComponent={"No member yet"}
            />
          </DataTableExtensions>
        )}
      </div>
    </AuthContainer>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  resetPostData: PropTypes.func.isRequired,
  deletePosts: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  postsRequest: state.posts.postsRequest,
  posts: state.posts.posts,
  newPost: state.posts.newPost,
  editPostData: state.posts.editPostData,
  noPostData: state.posts.noPostData,
  noPostDataRequest: state.posts.noPostDataRequest,
  editPostDataRequest: state.posts.editPostDataRequest,
});
export default connect(mapStateToProps, {
  getPosts,
  deletePosts,
  resetPostData,
})(Posts);
