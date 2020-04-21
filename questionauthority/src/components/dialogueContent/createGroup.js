import React, { useState, useEffect } from 'react';
import requestServer from '../../proto/requesting';
import {ReqPackage, prepPackage} from '../../proto/ReqPackage';

function CreateGroup(props) {
    const [newGroupName, setNewGroupName ]= useState({value: ''});
    const handleNewGroupNameChange = event => {
        setNewGroupName(event.target.value);
    };

    props.setOkHandle(() => {

    });

    return (
        <>
            <div className="create-group-form form-group">
                <label for='groupName'>Group name:</label>
                <input id='groupName' className='form-control' type='text' onChange={handleNewGroupNameChange} value={newGroupName.value}/>
                <small id='groupNameHelp' className='form-text text-muted'>You may not change the name of the group afterward</small>
            </div>
        </>
    );
}

export default CreateGroup;