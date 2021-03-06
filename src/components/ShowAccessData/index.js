import React, { Fragment } from 'react';
const ShowAccessData = ({ member }) => {
  const { 
    // _id,
    firstname, middlename, lastname, email, access, phone,  status, auth, group} = member;
  return ( 
    <Fragment>
       <section className="section">
            <header className="section-header">
              <h2 className="title"> Basic Access Data</h2>
            </header>
            <div className="data">
              
              <div className="data-field">
                <span className="data-key"> Access ID </span>
                <article className="data-value"> { access && access} </article>
              </div>
              <div className="data-field">
                <span className="data-key">Firstname </span>
                <article className="data-value"> { firstname && firstname} </article>
              </div>
              <div className="data-field">
                <span className="data-key">Middlename </span>
                <article className="data-value"> { middlename && middlename} </article>
              </div>
              <div className="data-field">
                <span className="data-key">Lastname </span>
                <article className="data-value"> { lastname && lastname} </article>
              </div>
              <div className="data-field">
                <span className="data-key">Email </span>
                <article className="data-value"> { email && email} </article>
              </div>
              <div className="data-field">
                <span className="data-key">Phone </span>
                <article className="data-value"> { phone && phone} </article>
              </div>
              <div className="data-field">
                <span className="data-key">Group </span>
                <article className="data-value"> { group && group} </article>
              </div>
              <div className="data-field">
                <span className="data-key">Status </span>
                <article className="data-value"> { status && status} </article>
              </div>
              <div className="data-field">
                <span className="data-key">Role </span>
                <article className="data-value"> { auth.join(' | ')} </article>
              </div>
            </div>
            
          </section>
    </Fragment>
   );
}
 
export default ShowAccessData;