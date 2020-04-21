import React from 'react';
import Modal from 'react-bootstrap/Modal';

/**
 * Modal container with ok and cancel.
 * 
 * Will pass a setter function for the ok handle to the given modal content.
 * @param {*} props 
 */
function DialogueTwoWay(props) {
    const DefaultTitle = "Are you sure?";
    const DialogueTitle = props.title === null ? DefaultTitle : props.title;

    const hideModal = () => {
        props.setIsOpen(false);
    };

    let onOkClickHandler = () => {
        // $('dialogueTwoWay').modal('dispose');
    };

    const setOkHandle = newHandler => {
        onOkClickHandler = newHandler;
    };

    const DialogueContent = props.dialogueContent === null ? null : (
        <form id='dialogue-two-way-content-container'>
            <props.dialogueContent setOkHandle={setOkHandle} />
        </form>
    );

    return (
        <Modal className='modal fade' id='dialogueTwoWay' tabIndex='-1' role='dialogue' show={props.isOpen}>
            <div className='modal-dialogue' role='document'>
                <div className='modal-content'>
                    <Modal.Header className='modal-header'>
                        <h5 className="modal-title" id="dialogueTwoWayTitle">{DialogueTitle}</h5>
                        <button type="button" className="close" onClick={hideModal} >
                            <span>&times;</span>
                        </button>
                    </Modal.Header>

                    <Modal.Body className='modal-body'>
                        {DialogueContent}
                    </Modal.Body>

                    <Modal.Footer className='modal-footer'>
                        <button type="button" className="btn primary-btn-color" onClick={onOkClickHandler}>Accept</button>
                        <button type="button" className="btn btn-secondary" onClick={hideModal}>Cancel</button>
                    </Modal.Footer>
                </div>
            </div>
        </Modal>
    );
}

export default DialogueTwoWay;