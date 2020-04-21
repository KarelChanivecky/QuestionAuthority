import React from 'react';

function DialogueOk({ message }) {
    return (
        <div className='modal fade' id='dialogueOk' tabIndex='-1' role='dialogue'>
            <div className='modal-dialog' role='document'>
                <div className='modal-conent'>
                    <div className='modal-header'>
                        <h5 class="modal-title" id="dialogueOkTitle">{message}</h5>
                        <button type="button" class="close" data-dismiss="modal" >
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className='modal-footer'>
                        <button type="button" class="btn btn-primary">Ok</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DialogueOk;