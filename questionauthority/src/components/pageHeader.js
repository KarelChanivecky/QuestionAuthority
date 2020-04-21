import React from 'react';

function PageHeader() {
    return (
        <>
            <header className='container-fluid' id="page-header-container">
                <div className='row' id='page-header-top'>
                    <div className='col-3' id='logo-div'>
                        <img className='header-icon' id='page-header-logo' alt='Question Authority Logo' title='Question Authority' src={require('../img/logo.svg')}/>
                    </div>
                    <div className='col-6' id='page-title-div'>
                        {/* to be implemented in the future */}
                    </div>
                    <div className='col-3 justify-content-end' id='notif-div'>
                        {/* to make functional in the future */}
                        <img className='dropdown header-icon' id='notif-button' alt='Notifications' title='notifications' src={require('../img/mail.svg')}/>  
                    </div>
                </div>
                {/* may add breadcrumbs here at later time */}
            </header>
        </>
    );
}

export default PageHeader;