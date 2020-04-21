import React from 'react';

function ContentList(props) {
    return (
        <div className='jumbotron'>
            <ul className='list-group list-group-flush'>
                {props.dataset.recordset.map((element, key) => {
                    return <props.Component key={key} data={element} />
                })}
            </ul>
        </div>
    );
}

export default ContentList;