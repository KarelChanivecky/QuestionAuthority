import express, { request } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import * as mssql from './mssql';
import * as sqlQueries from './SQLqueries';
import * as utils from './utilities';
import handleError from './sqlErrorHandles';

// EXPRESS
const app = express();  // initialize express server
app.use(express.static(path.join(__dirname, '/build')));  // static requests directed to react
app.use(bodyParser.json());  // parse package body with json

// GLOBALS
const timeNowISO = utils.getISOtime;

// response object
class ResponseObject {
    constructor() {
        this.data = null;
        this.err = null;
    }
}

// auth management



/**
 * responseHandle
 * 
 * Will query database, handle errors and respond accordingly
 * 
 * @param {express.Response} res : an express response object
 * @param {String} query : a string containing an SQL query
 */
async function responseHandle(res, query){
    console.log(query);
    let result = new ResponseObject();
    try {
        result.data = await mssql.queryDB(query);
    } catch (err) {
        console.log(err);
        result.err = handleError(err);
        res.status(500).json(result);
    }
    if (!result.err){
        res.status(200).json(result);
    }
}
/**
 * endpoints:
 * - profile
 * - add-notification
 * - remove notification
 * - group-list
 * - thread-list
 * - search-thread-list
 * - member-list
 * - join-requests
 * - thread-content
 * - update-profile
 * - delete-user
 * - new-group
 * - remove-group
 * - send join request
 * - remove-user-from-group
 * - swap-group-admin
 * - create-thread
 * - post-to-thread
 * - mark-answered
 * - un-mark-answered
 * - delete-thread
 * - delete-post
 * - addNotification
 * - removeNotification
 * - createUser
 * - updateUserTime
 * - addGroupUser
 * - addGroupInstructor
 * - removeGroupInstructor
 * - setSticky
 * - unSetSticky
 * - editThreadPost

 */

//  get profile
/**
 * PRECONDITIONS:
 *      body must contain:
 *      string uid: the current user id
 * 
 * POST-CONDITIONS:
 *      will retrieve the profile info for the specified uid
 *      if uid exists
 * 
 *      else will return an error
 */
app.post('/api/users/:name/get-profile', async (req, res) => {
    const { uid } = req.body;
    let query = sqlQueries.getProfile(uid);
    responseHandle(res, query);
});

//  get group list
/**
 * PRECONDITIONS:
 *      body must contain:
 *      string uid: the current user id
 * 
 * POST-CONDITIONS:
 *      will retrieve all the groups the uid belongs to
 *      if uid exists
 * 
 *      else will return an error
 */
app.post('/api/groups/get-list', async (req, res) => {
    const { uid } = req.body;
    let query = sqlQueries.getGroupList(uid);
    responseHandle(res, query);
});

//  get thread list
/**
 * PRECONDITIONS:
 *      body must contain:
 *      string uid: the current user id
 *      string groupID: the ID of the parent group
 * 
 * POST-CONDITIONS:
 *      will retrieve the thread list of the parent group
 *      if uid belongs to the parent group
 * 
 *      else if does not belong in parent group
 *      or any ID does not exist
 *      will return an error
 */
app.post('/api/groups/:group/threads/get-list', async (req, res) => {
    const { uid, groupID } = req.body;
    let query = sqlQueries.getThreads(uid, groupID);
    let queryResult;
    try {
        queryResult = await mssql.queryDB(query);
    } catch (err) {
        let errHandle = handleError(err);
        console.log(errHandle);
        if (!errHandle.errNumber){
            res.status(500).send('Oops, database error!');
        }
        else{
            res.status(200).json(errHandle);
        }
    }
    res.status(200).json(queryResult);
});

//  get search thread-list
/**
 * PRECONDITIONS:
 *      body must contain:
 *      string uid: the current user id
 *      string groupID: the ID of the parent group
 *      string query: the query to seek in the parent group's threads 
 *
 * POST-CONDITIONS:
 *      will query database and return a list of threads
 *      if uid belongs to the parent group
 * 
 *      else if does not belong in parent group
 *      or any ID does not exist
 *      will return an error
 */
app.post('/api/groups/:group/threads/search', async (req, res) => {
    const { uid, groupID, searchQuery } = req.body;
    let query = sqlQueries.searchInThreads(uid, groupID, searchQuery);
    responseHandle(res, query);
});

//  get member list
/**
 * PRECONDITIONS:
 *      body must contain:
 *      string uid: the current user id
 *      string groupID: the ID of the parent group
 * 
 * POST-CONDITIONS:
 *      will retrieve the member list of the parent group
 *      if uid is an instructor of the parent group
 * 
 *      else if not an instructor of the parent group
 *      or any ID does not exist
 *      will return an error
 */
app.post('/api/groups/:group/members', async (req, res) => {
    const { uid, groupID } = req.body;
    let query = sqlQueries.getGroupMembers(uid, groupID);
    responseHandle(res, query);
});

//  get join-requests
/**
 * PRECONDITIONS:
 *      body must contain:
 *      string uid: the current user id
 *      string groupID: the ID of the parent group
 * 
 * POST-CONDITIONS:
 *      will retrieve the post contents
 *      if uid is an instructor of the parent group
 * 
 *      else if not an instructor of the parent group
 *      or any ID does not exist
 *      will return an error
 */
app.post('/api/groups/:group/join-requests', async (req, res) => {
    const { uid, groupID } = req.body;
    console.log('join requests hit');
    let query = sqlQueries.getGroupJoinRequests(uid, groupID);
    responseHandle(res, query);
});

//  get post-contents
/**
 * PRECONDITIONS:
 *      body must contain:
 *      string uid: the current user id
 *      string postID: the ID of the desired post
 *      string groupID: the ID of the parent group of the post
 * 
 * POST-CONDITIONS:
 *      will retrieve the post contents
 *      if uid belongs to the parent group
 * 
 *      else if any ID does not exist
 *      will return an error
 */
app.post('/api/groups/:group/threads/:thread', async (req, res) => {
    const { uid, threadID } = req.body;
    let query = sqlQueries.getThread(uid, threadID);
    responseHandle(res, query);
});

// POST update profile
/**
 * PRECONDITIONS:
 *      body must contain:
 *      string uid: the current user id
 * 
 * POST-CONDITIONS:
 *      will update the user's profile
 *      if uid belongs to the group admin
 * 
 *      else if any of the given IDs does not exist, will return an error message
 *          
 */
app.post('/api/users/:user/update', async (req, res) => {
    const { uid, name, email } = req.body;
    let query = sqlQueries.updateUser(uid, name, email);
    responseHandle(res, query);
});

//  POST delete-user
/**
 * PRECONDITIONS:
 *      body must contain:
 *      string uid: the current user id
 * 
 * POST-CONDITIONS:
 *      will delete the current user
 * 
 *      else if the given ID does not exist, will return an error message
 *          
 */
app.post('/api/users/:user/delete', async (req, res) => {
    const { uid } = req.body;
    let query = sqlQueries.deleteUser(uid);
    responseHandle(res, query);
});

//  POST new group
/**
 * PRECONDITIONS:
 *      body must contain:
 *      string uid: the current user id
 *      string name: name of the group
 * 
 * POST-CONDITIONS:
 *      will create a new group 
 *      if uid belongs to the group admin
 * 
 *      else if not authorized, will return an error message
 *      else if any of the given IDs does not exist, will return an error message
 *          
 */
app.post('/api/groups/new', async (req, res) => {
    const { uid, name } = req.body;
    let query = sqlQueries.createGroup(uid, name);
    responseHandle(res, query);
});

// POST send join request
/**
 * PRECONDITIONS:
 *      body must contain:
 *      string uid: the current user id
 *      string groupToJoin: the ID of the group to request to join
 * 
 * POST-CONDITIONS:
 *      will request to join group
 *      if uid exists
 * 
 *      else if any of the given IDs does not exist, will return an error
 *          
 */
app.post('/api/groups/:group/request-to-join', async (req, res) => {
    const { uid, groupID } = req.body;
    let query = sqlQueries.addJoinRequest(uid, groupID);
    responseHandle(res, query);
});

//  POST delete-group
/**
 * PRECONDITIONS:
 *      body must contain:
 *      string uid: the current user id
 *      string groupToDeleteID: the ID of the group to be removed
 * 
 * POST-CONDITIONS:
 *      will delete the group
 *      if uid belongs to the group admin
 * 
 *      else if not authorized, will return an error message
 *      else if any of the given IDs does not exist, will return an error message
 *          
 */
app.post('/api/groups/:group/delete', async (req, res) => {
    const { uid, groupID } = req.body;
    let query = sqlQueries.deleteGroup(uid, groupID);
    responseHandle(res, query);
});

//  POST remove-user-from-group
/**
 * PRECONDITIONS:
 *      body must contain:
 *      string uid: the current user id
 *      string groupID: the group ID
 *      string userToRemoveID: the ID of the user to be removed
 * 
 * POST-CONDITIONS:
 *      will remove the user from group 
 *      if uid belongs to the group admin or if usertoRemoveID equals uid
 * 
 *      else if not authorized, will return an error message
 *      else if any of the given IDs does not exist, will return an error message
 *          
 */
app.post('/api/groups/:group/remove-user', async (req, res) => {
    const { uid, groupID, userToRemove } = req.body;
    let query = sqlQueries.removeGroupUser(uid, groupID, userToRemove);
    responseHandle(res, query);
});

//  POST swap-group-admin
/**
 * PRECONDITIONS:
 *      body must contain:
 *      string uid: the current user id
 *      string groupID: the group ID
 *      string newAdminID: the ID of the new admin. Must be an instructor
 * 
 * POST-CONDITIONS:
 *      will swap the group adming to the given new admin id
 *      if uid belongs to one of the group instructors and newAdminID belongs to an instructor
 * 
 *      else if not authorized, will return an error message
 *      else if any of the given IDs does not exist, will return an error message
 *          
 */
app.post('/api/groups/:group/swap-admin', async (req, res) => {
    const { uid, groupID, newAdminID } = req.body;
    let query = sqlQueries.swapGroupAdmin(uid, groupID, newAdminID);
    responseHandle(res, query);
});
//  POST create-thread
/**
 * PRECONDITIONS:
 *      body must contain:
 *      string uid: the current user id
 *      string groupID: the group ID
 *      string text: the reply text
 * 
 * POST-CONDITIONS:
 *      will create a new thread
 *      if any of the given IDs does not exist, will return an error message
 *          
 */
app.post('/api/groups/:group/new-thread', async (req, res) => {
    const { uid, groupID, text, title } = req.body;
    let query = sqlQueries.createThread(uid, groupID, timeNowISO(), title, text);
    responseHandle(res, query);
});

//  POST post-to-thread
/**
 * PRECONDITIONS:
 *      body must contain:
 *      string uid: the current user id
 *      string groupID: the group ID
 *      string postID: the post ID
 *      string text: the reply text
 * 
 * POST-CONDITIONS:
 *      will add the reply to the post
 *      if any of the given IDs does not exist, will return an error message
 *          
 */
app.post('/api/groups/:group/threads/:thread/post', async (req, res) => {
    const { uid, threadID, text } = req.body;
    let query = sqlQueries.addThreadPost(uid, threadID, text, timeNowISO());
    responseHandle(res, query);
});

//  POST mark-answered
/**
 * PRECONDITIONS:
 *      body must contain:
 *      string uid: the current user id
 *      string groupID: the group ID
 *      string threadID: the thread ID
 * 
 * POST-CONDITIONS:
 *      will mark the thread as answered 
 *      if uid belongs to one of the group instructors
 * 
 *      else if not authorized, will return an error message
 *      else if any of the given IDs does not exist, will return an error message
 *          
 */
app.post('/api/groups/:group/threads/:thread/mark-answered', async (req, res) => {
    const { uid, threadID } = req.body;
    let query = sqlQueries.markThreadAnswered(uid, threadID);
    responseHandle(res, query);
});

//  POST unmark-answered
/**
 * PRECONDITIONS:
 *      body must contain:
 *      string uid: the current user ID
 *      string groupID: the group ID
 *      string threadID: the post ID
 * 
 * POST-CONDITIONS:
 *      will mark the thread as not answered 
 *      if uid belongs to the thread author
 * 
 *      else if not authorized, will return an error message
 *      else if any of the given IDs does not exist, will return an error message
 *          
 */
app.post('/api/groups/:group/threads/:thread/unmark-answered', async (req, res) => {
    const { uid, threadID } = req.body;
    let query = sqlQueries.markThreadUnanswered(uid, threadID);
    responseHandle(res, query);
});

//  POST delete-thread
/**
 * PRECONDITIONS:
 *      body must contain:
 *      string uid: the current user id
 *      string groupID: the group ID
 *      string threadID: the post ID
 * 
 * POST-CONDITIONS:
 *      will delete the given thread
 *      if uid belongs to one of the group instructors, or uid is the thread's author's id
 * 
 *      else if not authorized, will return an error message
 *      else if any of the given IDs does not exist, will return an error message
 *          
 */
app.post('/api/groups/:group/threads/:thread/delete', async (req, res) => {
    const { uid, threadID } = req.body;
    let query = sqlQueries.deleteThread(uid, threadID);
    responseHandle(res, query);
});

//  POST delete-thread-post
/**
 * PRECONDITIONS:
 *      body must contain:
 *      string uid: the current user id
 *      string groupID: the group ID
 *      string postID: the post ID
 *      string replyID: the reply ID
 * 
 * POST-CONDITIONS:
 *      will delete the given reply
 *      if uid belongs to one of the group instructors, or uid is the reply's author's id
 * 
 *      else if not authorized, will return an error message
 *      else if any of the given IDs does not exist, will return an error message
 *          
 */
app.post('/api/groups/:group/threads/:thread/posts/:post/delete', async (req, res) => {
    const { uid, postID } = req.body;
    console.log(uid, postID);
    let query = sqlQueries.deleteThreadPost(uid, postID);
    responseHandle(res, query);
});

// POST add-notification
/**
 * PRECONDITIONS:
 *     body must contain:
 *     string fromID: userID of the sender
 *     string toID: userID of recipient
 *     string text: the text of the notification
 * 
 * POSTCONDITIONS:
 *     will add notification for the recipient
 */
app.post('/api/users/:user/add-notification', async (req, res) => {
    const { toID, text } = req.body;
    let query = sqlQueries.addNotification(fromID, toID, text, timeNowISO());
    responseHandle(res, query);
});

// POST get-notifications
/**
  * PRECONDITIONS:
  *     body must contain:
  *     string uid: the current userID
  * 
  * POST-CONDITIONS:
  *     Will retrieve all notifications for the user, including the sender's name
  */
app.post('/api/users/:user/get-notifications', async (req, res) => {
    const { uid } = req.body;
    let query = sqlQueries.getNotifications(uid);
    responseHandle(res, query);
});

// POST delete notification
/**
  * PRECONDITIONS:
  *     body must contain:
  *     string uid: the current userID
  *     int notifID: the ID of the notification to be removed
  * 
  * POST-CONDITIONS:
  *     Will delete the notification if the notification ID given is
  *     linked to the current user
  *     
  */
app.post('/api/users/:user/remove-notification', async (req, res) => {
    const { uid, notifID } = req.body;
    let query = sqlQueries.removeNotification(uid, notifID);
    responseHandle(res, query);
});

// POST create-user
/**
  * PRECONDITIONS:
  *     body must contain:
  *     string uid: the current userID as provided by firebase
  *     string name: the current user name
  *     boolean isInstructor: isInstructor flag
  *     
  *     body may contain:
  *     string email: the user email
  * 
  * POST-CONDITIONS:
  *     will add the new user to DB
  */
app.post('/api/users/new', async (req, res) => {
    let { uid, name, isInstructor, email } = req.body;
    let query = sqlQueries.createUser(uid, name, isInstructor, timeNowISO(), email);
    responseHandle(res, query);
});

// POST add-group-instructor
/**
  * PRECONDITIONS:
  *     body must contain:
  *     string uid: the current userID 
  *     int groupID: the groupID
  *     string instructorID: the ID of the instructor to be added
  * 
  * POST-CONDITIONS:
  *     will add the instructor to the group
  */
app.post('/api/groups/:group/add-instructor', async (req, res) => {
    const { uid, groupID, instructorID } = req.body;
    let query = sqlQueries.addGroupInstructor(uid, groupID, instructorID);
    responseHandle(res, query);
});

// POST remove-group-instructor
/**
  * PRECONDITIONS:
  *     body must contain:
  *     string uid: the current userID 
  *     int groupID: the groupID
  *     string instructorID: the ID of the instructor to be removed
  *     
  */
app.post('/api/groups/:group/remove-instructor', async (req, res) => {
    const { uid, groupID, instructorID } = req.body;
    let query = sqlQueries.removeGroupInstructor(uid, groupID, instructorID);
    responseHandle(res, query);
});

// POST add-group-user
/**
  * PRECONDITIONS:
  *     body must contain:
  *     string uid: the current userID 
  *     int groupID: the groupID
  *     string newMemberID: the ID of the new member to be added
  * 
  * POST-CONDITIONS:
  *     WIll add the new member to the group
  *     if uid is either a group admin or group instructor
  */
app.post('/api/groups/:group/add-member', async (req, res) => {
    const { uid, groupID, newMemberID } = req.body;
    let query = sqlQueries.addGroupUser(uid, groupID, newMemberID);
    responseHandle(res, query);
});

// POST set-sticky 
/**
  * PRECONDITIONS:
  *     body must contain:
  *     string uid: the current userID 
  *     int, threadID: the ID of the thread to be made sticky
  * 
  * POST-CONDITIONS:
  *     will set the thread as sticky
  */
app.post('/api/groups/:group/threads/:thread/set-sticky', async (req, res) => {
    const { uid, threadID } = req.body;
    let query = sqlQueries.setSticky(uid, threadID);
    responseHandle(res, query);
});

// POST un-set-sticky 
/**
  * PRECONDITIONS:
  *     body must contain:
  *     string uid: the current userID 
  *     int, threadID: the ID of the thread to be unmade sticky
  * 
  * POST-CONDITIONS:
  *     will un-set the thread as sticky
  */
app.post('/api/groups/:group/threads/:thread/un-set-sticky', async (req, res) => {
    const { uid, threadID } = req.body;
    let query = sqlQueries.unSetSticky(uid, threadID);
    responseHandle(res, query);
});

// POST edit-thread-post
/**
  *  PRECONDITIONS:
  *     body must contain:
  *     string uid: the current userID 
  *     int postID: the ID of the post to be edited
  *     string text: the new text
  * 
  * POST-CONDITIONS:
  *     Will edit the text of the post and update the last edit date of the post
  */
app.post('/api/groups/:group/threads/:thread/posts/:postID/edit', async (req, res) => {
    const { uid, postID, text } = req.body;
    let query = sqlQueries.editThreadPost(uid, postID, text, timeNowISO());
    responseHandle(res, query);
});

app.post('*', (req, res) => {
    res.status(200).send("you can't hit a melon. remember to fix this after");
});

app.listen(8000, () => { console.log('Listening on port 8000'); });