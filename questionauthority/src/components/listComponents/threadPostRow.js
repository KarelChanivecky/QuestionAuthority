import React from 'react';

function ThreadPostRow({ postData }) {
    const certifyPostOnclickHandler = () => {

    };

    const editPostOnClickHandler = () => {

    };

    const deletePostOnclickHandler = () => {

    };
    
    return (
        <li className='list-group-item'>
            <div className='card'>
                <div className='header  row'>
                    <div className='col-6 justify-content-start'>
                        {postData.author}
                    </div>
                    <div className='col-6 justify-content-end'>
                        <p className='post-header-text'>
                            {"Posted on: " + postData.datePosted + (postData.lastEdited !== null ? "\nLast edit edit on: " + postData.lastEdited : "")}
                        </p>
                    </div>
                </div>
                
                <div className='card-body post-text'>
                    <p className='card-text'>{postData.text}</p>
                </div>
                
                {/* footer buttons */}
                <div className='card-footer justify-content-end'>
                    <button className='btn post-footer-button certified-btn'>
                        <img className='post-footer-button-img ' alt={postData.isCertified?"Certified": "Not certified"} title={postData.isCertified?"Certified": "Not certified"}
                        src={postData.isCertified? require('../../img/not_approved.svg'): require('../../img/approved.svg')}/>
                    </button>
                    <button className='btn post-footer-button edit-btn'>
                        <img className='post-footer-button-img' alt='edit post' title='Edit post' src={require('../../img/edit.svg')}/>
                    </button>
                    {/*if admin show*/<button className='btn post-footer-button-badge for-admin'>
                        <img className='post-footer-button-img' alt='delete post' title='Delete post' src={require('../../img/trash.svg')}/>
                    </button>}
                </div>
            </div>
        </li>
    );
}

export default ThreadPostRow;