import React, { Fragment, useState } from 'react';

const OnBoard = () => {
    const [data, setData] = useState({allowlist: ''});
    const handleChange = ({ target }) => {
        const { name, files } = target;
        setData(prev => ({
          [name]: files[0]
        }))
      };
      const handleSubmit = e => {
        e.preventDefault();
        const fd = new FormData();
        fd.append('allowlist', data.allowlist);

        const fetchOptions = {
            method: 'POST',
            body: fd,
            // headers: {
            //     "Content-Type": 'multipart/form-data'
            // }
        }
        fetch('http://localhost:5000/api/allowlist', fetchOptions)
            .then(r => r.json())
            .then(data => {
                console.log('Upload data', data)
            })
            .catch(err => {
                console.log('Upload err', err)
            })
      };
    
    return ( 
        <Fragment>
            <h1> upkoad Access </h1>
            <form className='form' onSubmit={handleSubmit} encType='multipart/form-data'>
           
            <div className='form-group'>
                <label htmlFor='allowlist'> Upload Access List</label>
                <input type='file' name='allowlist' id='allowlist' onChange={handleChange} className='form-control'/>
            </div>
            <button type='submit' className='btn btn-primary'> Upload </button>
            </form>


        </Fragment>
    );
}
 
export default OnBoard;