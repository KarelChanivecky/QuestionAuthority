import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import ContentList from "../components/listComponents/contentList";
import GroupListRow from "../components/listComponents/groupListRow";
import BackButton from "../components/backButton";
import SearchBar from "../components/searchBar";

function GroupSearchPage() {
    const dataset = {recordset:[]};
    const [PageContent, setPageContent] = useState(<p id='group-search-page-cto'>Make a search to see results</p>);
    const groupListComponent = <ContentList dataset={dataset} Component={GroupListRow} />;
    const pathBack = '/groups';
    return (
        <>
            <div className='container-fluid'>
                <div className='row justify-content-center'>
                    <BackButton pathBack={pathBack}/>
                </div>
                <SearchBar useSearchResults={setPageContent}/>
            </div>
            <h3 id='list-header'>Available groups:</h3>
            {PageContent}
        </>
    );
}

export default GroupSearchPage;