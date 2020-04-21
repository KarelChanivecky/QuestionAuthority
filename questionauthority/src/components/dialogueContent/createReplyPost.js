import React from 'react';

function CreateReplyPost(props) {
    props.setOkHandle(() => {

    });

    return (
        <>
           <div className="create-reply-form form-group">
               <label for='replyText'>Reply:</label>
               <input id='replyText' className='form-control' type='text'/>
           </div>
        </>
    );
}

export default CreateReplyPost;