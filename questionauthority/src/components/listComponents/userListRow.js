import React from 'react';

function UserListRow({userData}) {
    const swapAdminOnClick = () => {

    };

    const kickUserOnClick = () => {

    };

    const forInstructor = (
        <li className='list-group-item'>
            <div className='row'>
                <div className='col-8'>
                    <p className='list-row-text' id={"user" + userData.ID}>{userData.name}</p>
                </div>
                <div className='col-2'>
                    <img className='list-row-icon' title={"Swap admin powers with" + userData.name} alt={"Swap admin powers with" + userData.name} onClick={swapAdminOnClick} src={require('../../img/admin.svg')}/>
                </div>
                <div className='col-2'>
                    <img className='list-row-icon' title={"Kick" + userData.name + "from group"} alt={"Kick" + userData.name + "from group"} onClick={kickUserOnClick} src={require('../../img/trash.svg')} />
                </div>
            </div>
        </li>
    );

    const forNonInstructor = (
        <li className='list-group-item'>
            <div className='row'>
                <div className='col-10'>
                    <p className='list-row-text' id={"user" + userData.ID}>{userData.name}</p>
                </div>
                <div className='col-2'>
                    <img className='list-row-icon' title={"Kick" + userData.name + "from group"} alt={"Kick" + userData.name + "from group"} onClick={kickUserOnClick} src={require('../../img/trash.svg')} />
                </div>
            </div>
        </li>
    );
    return userData.isInstructor? forInstructor: forNonInstructor;
}

export default UserListRow;