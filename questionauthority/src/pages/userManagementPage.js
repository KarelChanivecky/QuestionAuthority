import React, { useState } from 'react';
import ContentList from '../components/listComponents/contentList';
import UserListRow from '../components/listComponents/userListRow';
import BackButton from '../components/backButton';

function UserManagementPage() {
    const [dataset, setDataset] = useState({recordset: []});    

    const pathBack = '/groups';
    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-6'>
                        <BackButton pathBack={pathBack}/>
                    </div>
                    <div className='col-6'>
                    <button className='btn page-btn-2 primary-btn-color'>
                            <img className='page-btn-img' alt='See join requests' title='See join requests' src={require('../img/approved.svg')} />
                        </button>
                    </div>
                    
                </div>
            </div>
            <h3 id='list-header'>Group users:</h3>
            <ContentList dataset={dataset} Component={UserListRow}/>
        </>
    );
}

export default UserManagementPage;