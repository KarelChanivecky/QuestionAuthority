import React from 'react';

function CreateUser(props) {
    // props.setOkHandle(()=>{ // must complete functionality
    //     if (confirm("Are you sure?")){
    //         $('dialogTwoWay').modal('dispose');
    //     }
    // });

    return (
        <>
            <div className="create-user-form form-group">
                <label htmlFor='usernameInput'>Username:</label>
                <input id='usernameInput' name='usernameInput' type='text' className='form-control' placeholder='Username must be unique, no spaces.' value={props.username}/>
            </div>
            <div className="create-user-form form-group">
                <label htmlFor='emailInput'>Email:</label>
                <input id='emailInput' name='emailInput' type='email' className='form-control' placeholder='email must be in the form AAAA@AAAAA.AAA'/>
            </div>
            <div className="create-user-form form-group">
                <label htmlFor='passwordInput'>Password:</label>
                <input id='passwordInput' name='passwordInput' type='password' className='form-control' placeholder='Must have at least 6 characters' value={props.password}/>
                <small id='passwordHelp' className='form-text text-muted'>Passwords must have at least 6 characters</small>
            </div>
        </>
    );
}

export default CreateUser;