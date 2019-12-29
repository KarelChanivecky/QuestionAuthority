import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

/**
 *  landing page
 * 
 * users not logged in will be redirected here
 */


/**
 * Login page
 *
 * User logs-in here
 * 
 * if new user or not initialized profile, redirect to profile page. Else redirect to group-list page.
 * 
 * */


/**
 * group-list page
 * 
 * 
 * users can manage their groups here:
 * 
 * students can:
 * -search for new groups 
 * -request to join groups
 * -access current groups
 * -exit current groups
 * 
 * instructors can:
 * -create new groups
 * -access group content
 * -manage individual groups
 * 
 *  */



/**
 * group page
 * 
 * The group content is displayed here
 * 
 * students can:
 * -post new threads
 * -access existing threads
 * -search in existing threads
 * -exit group
 * -navigate to group-list page
 * 
 * instructors can:
 * -access existing threads
 * -search in existing threads
 * -remove threads
 * -navigate to group-list page
 * -navigate to manage-group page
 * 
 */

/**
 * new-post page
 * 
 * ONLY accessible to students
 * 
 * students must:
 * -provide a post name
 * -provide post content
 * 
 */


/**
 * question page
 * 
 * the thread details are found here
 * 
 * all users can:
 * - reply to post
 * 
 * instructors can:
 * - mark as answered
 * - delete post
 * - delete post-reply
 * 
 * author can:
 * - un-mark as answered
 * - delete post
 * 
 * reply author can:
 * - delete post-reply
 * 
 */


/**
 * profile-page
 * 
 * all users must:
 * -provide a name
 * -choose between instructor, or student(cannot be changed after initialization)
 * 
 * all users can:
 * -change password
 * -delete account(
 *      there must be a different group admin in every group before an instructor can delete his account.
 *      This is only accessible to a user that has previously been initialized
 * )
 * 
 */


/**
 * manage-group page
 * 
 * ONLY accessible to instructors
 * 
 * instructors can:
 * -delete group
 * -accept join requests (must be admin to accept request from instructor)
 * -reject join requests
 * -remove users
 * 
 * 
 * group admin:
 * - add instructor
 * - remove instructor
 * - swap admin status
 */

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
