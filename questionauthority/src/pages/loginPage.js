import React, { useState, useEffect } from 'react';
import DialogTwoWay from '../components/dialogueContent/dialogueTwoWay';
import CreateUser from '../components/dialogueContent/createUser';
import {withRouter} from 'react-router-dom';

function LoginPage(props) {
    const [username, setUsername] = useState({value: ''});
    const [password, setPassword] = useState({value: ''});
    const [dialogueIsOpen, setDialogueIsOpen] = useState(false);
    const onSubmitHandler = (e => {
        e.preventDefault();
        props.history.push('/groups');
    });

    const showModal = () => {
        setDialogueIsOpen(true)
    };

    const onSignupClickHandler = () => {
        showModal();
    };

    // Handle login data entry
    const handleUsernameChange = event => {
        setUsername({value: event.target.value});
    };
    // Handle login data entry  
    const handlePasswordChange = event => {
        setPassword({value: event.target.value});
    };

    

    return (
        <>
            <div className='container'>
                <DialogTwoWay dialogueContent= {CreateUser} title={'Create user'} username={username} password={password} isOpen={dialogueIsOpen} setIsOpen={setDialogueIsOpen}/>
                <form id='login-form' onSubmit={onSubmitHandler}>
                    <div className="form-group" onSubmit={onSubmitHandler}>
                        <label htmlFor="usernameInput">Username:</label>
                        <input type="username" className="form-control" id="usernameInput" placeholder="Enter username" onChange={handleUsernameChange} value={username.value}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordInput">Password</label>
                        <input type="password" className="form-control" id="passwordInput" placeholder="Enter password" onChange={handlePasswordChange} value={password.value}/>
                    </div>
                    <button type="submit" className="btn login-page-btn primary-btn-color">Submit</button>
                </form>
                <button  type="submit" className="btn login-page-btn primary-btn-color" id='signupBtn' onClick={()=>{onSignupClickHandler()}}>Sign up</button>
            </div>
        </>
    );
}

export default withRouter(LoginPage);