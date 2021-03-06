import React, { Fragment } from 'react';
import { APP_NAME } from '../../constants'
import "./Modal.scss";
const Modal = ({ visible, dismiss, message, component: Component }) => {

  return (
    
    <Fragment>
      <div className={`modal ${visible ? 'show' : ''}`}>

        <div className="modal-container">
          <span onClick={() => dismiss() } className="modal-close clearfix fa fa-times" />
          <div className="modal-header">
            <h1 className="text-lead"> { APP_NAME } </h1>
            <span className="text-info"> { message && message } </span>
          </div>
          <div className="modal-body">
            { Component }   
          </div>
          <div className="modal-footer clearfix">
            
          </div>
        </div>
      </div> 
    </Fragment>
  );
}
 
export default Modal;