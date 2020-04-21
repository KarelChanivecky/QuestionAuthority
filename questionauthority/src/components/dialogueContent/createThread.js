import React from 'react';

function CreateThread(props) {
    props.setOkHandle(() => {

    });

    return (
        <>
           <div className="create-thread-form form-group">
               <label for='threadTitle'>Title:</label>
               <input id='threadTitle' className='form-control' type='text'/>
           </div>
           <div className="create-thread-form form-group">
               <label for='threadText'>Question:</label>
               <input id='threadText' className='form-control' type='text'/>
           </div>
        </>
    );
}

export default CreateThread;