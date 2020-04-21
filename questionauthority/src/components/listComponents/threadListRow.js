import React from 'react';

function ThreadListRow({ threadData }) {
    const toThreadClick = () => {

    }

    return (
        <li className='list-group-item'>
            <div className='row' onClick={toThreadClick}>
                <div className='col-10'>
                    <p id={"thread" + threadData.ID} className='list-row-text' >{threadData.name}</p>
                </div>
                <div className='col-8'>
                    <img className='list-row-icon' alt={threadData.isCertified? "Certified": "Not Certified"} title={threadData.isCertified? "Certified": "Not Certified"}
                    src={require((threadData.isCertified? '../../img/approved.svg': '../../img/not_approved.svg'))}/>
                </div>
            </div>
        </li>
    );
}

export default ThreadListRow;