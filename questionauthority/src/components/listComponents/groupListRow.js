import React from 'react';
import { Link } from 'react-router-dom';


function GroupListRow({ data }) {
    

    const linkToManage = `/groups/${data.groupID}/manage`;
    const linkToThreads = `/groups/${data.groupID}/threads`;
    return (
        <li className='list-group-item'>
            <div className='row flex-nowrap align-items-center list-row'>
                <Link to={linkToThreads} className='col-10' >
                    <div className='row'>
                        <div className='col-2'>
                            {/* group image or color here someday*/}
                        </div>
                        <div className='col-10 justify-center'>
                            <span className='list-row-text'>{data.name}</span>
                        </div>
                    </div>
                </Link>
                <Link className='col-2 list-icon-col' to={linkToManage} >
                    <img className='list-row-icon' id={"group" + data.ID} title={"Manage" + data.name} alt={"Manage" + data.name} src={require('../../img/manage.svg')} />
                </Link>
            </div>
        </li>
    );
}

export default GroupListRow;