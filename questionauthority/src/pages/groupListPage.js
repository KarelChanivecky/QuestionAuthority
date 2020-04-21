import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import ContentList from "../components/listComponents/contentList";
import GroupListRow from "../components/listComponents/groupListRow";
import {requestServer} from '../proto/requesting';
import {ReqPackage, prepPackage} from '../proto/ReqPackage';
import DialogueTwoWay from '../components/dialogueContent/dialogueTwoWay';
import CreateGroup from '../components/dialogueContent/createGroup';

function GroupListPage() {
    const [dataset, setDataset] = useState({recordset:[]});
    const [dialogueIsOpen, setDialogueIsOpen] = useState(false);
    // need to request dataset from server, will be a list of objects.

    const showNewGroupDialogue = () => {
        setDialogueIsOpen(true)
    };
    
    // get dataset
    
    useEffect(() => {
            const getDataset = () => {
                requestServer('/api/groups/get-list', new ReqPackage('1'))
                                .then(response => setDataset(response));
        }
        getDataset();
    }, []);
    
    

    
    return (
        <>
            <div className='container-fluid'>
                <DialogueTwoWay dialogueContent={CreateGroup} title={'Create group'} isOpen={dialogueIsOpen} setIsOpen={setDialogueIsOpen}/>
                <div className='row'>
                    <div className='col-6'>
                        <button className='btn page-btn-2 primary-btn-color' onClick={showNewGroupDialogue}>
                            <img className='page-btn-img' alt='New group' title='Create new group' src={require('../img/new_group.svg')} />
                        </button>
                    </div>
                    <div className='col-6'>
                        <Link className='btn page-btn-2 primary-btn-color' to='/search-groups'>
                            <img className='page-btn-img' alt='Join new group' title='Join new group' src={require('../img/search_groups.svg')} />
                        </Link>
                    </div>
                </div>
            </div>
            <h1 id='list-header'>Your groups:</h1>
            <ContentList dataset={dataset} Component={GroupListRow} />
        </>
    );
}

export default GroupListPage;