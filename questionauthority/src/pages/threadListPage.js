import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import ContentList from "../components/listComponents/contentList";
import ThreadListRow from "../components/listComponents/threadListRow";
import SearchBar from "../components/searchBar";
import BackButton from "../components/backButton";

function ThreadListPage(props) {
    const [dataset, setDataset] = useState({recordset:[]});
    const pathBack = '/groups';
    console.log(props.match.params.group);

    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-6'>
                        <button className='btn page-btn-2 primary-btn-color'>
                            <img className='page-btn-img' alt='New question' title='Post new question' src={require('../img/add.svg')} />
                        </button>
                    </div>
                    <div className='col-6'>
                        <BackButton pathBack={pathBack}/>
                    </div>
                </div>
                <SearchBar useSearchResults={setDataset}/>
            </div>
            <h3 id='list-header'>Threads:</h3>
            <ContentList dataset={dataset} Component={ThreadListRow} />
        </>
    );
}

export default ThreadListPage;