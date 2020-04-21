import React from 'react';

function JoinRequestListRow() {
    const acceptOnClick = () => {

    };

    const rejectOnClick = () => {

    };

    return (
        <li>
            <div className='row'>
                <div className='col-8'>
                    <p className='list-row-text'></p>
                </div>
                <div className='col-2'>
                    <button className='btn' onClick={acceptOnClick}>
                        <img className='list-row-button' alt='Accept join request' title='Accept join request' src={require('../../img/accept.svg')} />
                    </button>
                </div>
                <div className='col-2'>
                    <button className='btn' onClick={acceptOnClick}>
                        <img className='list-row-button' alt='Reject join request' title = 'Reject join request' src={require('../../img/cancel.svg')} />
                    </button>
                </div>
            </div>
        </li>    
    );
}

export default JoinRequestListRow;