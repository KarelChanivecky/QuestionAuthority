import express, { request } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import * as mssql from './mssql';
import * as sqlQueries from './SQLqueries';
import * as utils from './utilities';

// EXPRESS
const app = express();  // initialize express server
app.use(express.static(path.join(__dirname, '/build')));  // static requests directed to react
app.use(bodyParser.json());  // parse package body with json

// GLOBALS

// REQUEST MANAGMENT
/**
 * paths:
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
 * 
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
    try {
        let queryResult = await mssql.queryDB(query);
    } catch (err) {
        res.status(500).send('Oops, database error!');
    }finally{
        res.status(200).json(queryResult);
    }    
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
app.post('api/groups/get-list', async (req, res) => {
    const { uid } = req.body;
    let query = sqlQueries.getGroupList(uid);
    try {
        let queryResult = await mssql.queryDB(query);
    } catch (err) {
        res.status(500).send('Oops, database error!');
    }finally{
        res.status(200).json(queryResult);
    }
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
app.post('api/:group/threads/get-list', async (req, res) => {
    const { uid, groupID } = req.body;
    let query = sqlQueries.getThreads(uid, groupID);
    try {
        let queryResult = await mssql.queryDB(query);
    } catch (err) {
        res.status(500).send('Oops, database error!');
    }finally{
        res.status(200).json(queryResult);
    }
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
app.post('api/:group/threads/search', async (req, res) => {
    const { uid, groupID, searchQuery } = req.body;
    let query = sqlQueries.searchInThreads(uid, groupID, searchQuery);
    try {
        let queryResult = await mssql.queryDB(query);
    } catch (err) {
        res.status(500).send('Oops, database error!');
    }finally{
        res.status(200).json(queryResult);
    }
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
app.post('api/:group/members', async (req, res) => {
    const { uid, groupID } = req.body;
    let query = sqlQueries.getGroupMembers(uid, groupID);
    try {
        let queryResult = await mssql.queryDB(query);
    } catch (err) {
        res.status(500).send('Oops, database error!');
    }finally{
        res.status(200).json(queryResult);
    }
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
app.post('api/:group/join-requests', async (req, res) => {
    const { uid, groupID } = req.body;
    let query = sqlQueries.getGroupJoinRequests(uid, groupID);
    try {
        let queryResult = await mssql.queryDB(query);
    } catch (err) {
        res.status(500).send('Oops, database error!');
    }finally{
        res.status(200).json(queryResult);
    }
});

//  get post contents
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
app.post('api/:group/threads/:thread', async (req, res) => {
    const { uid, threadID } = req.body;
    let query = sqlQueries.getThreads(uid, threadID);
    try {
        let queryResult = await mssql.queryDB(query);
    } catch (err) {
        res.status(500).send('Oops, database error!');
    }finally{
        res.status(200).json(queryResult);
    }
});

// POST create profile
/**
 * PRECONDITIONS:
 *      body must contain:
 *      string uid: the current user id
 * 
 * POST-CONDITIONS:
 *      will create the user's profile
 */
app.post('api/users/create', async (req, res) => {
    const { uid, name,  } = req.body;
    let query = sqlQueries.createUser(uid, name, utils.getISOtime());
    try {
        let queryResult = await mssql.queryDB(query);
    } catch (err) {
        res.status(500).send('Oops, database error!');
    }finally{
        res.status(200).json(queryResult);
    }
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
app.post('api/users/:user/update', async (req, res) => {
    const { uid, name, email} = req.body;
    let query = sqlQueries.updateUser(uid, name, utils.getISOtime(), email);
    try {
        let queryResult = await mssql.queryDB(query);
    } catch (err) {
        res.status(500).send('Oops, database error!');
    }finally{
        res.status(200).json(queryResult);
    }
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
app.post('api/users/:user/delete', async (req, res) => {
    const { uid, userToDelete } = req.body;
    let query = sqlQueries.deleteUser(uid);
    try {
        let queryResult = await mssql.queryDB(query);
    } catch (err) {
        res.status(500).send('Oops, database error!');
    }finally{
        res.status(200).json(queryResult);
    }
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
app.post('api/groups/new', async (req, res) => {
    const { uid, name } = req.body;
    let query = sqlQueries.createGroup(uid, name);
    try {
        let queryResult = await mssql.queryDB(query);
    } catch (err) {
        res.status(500).send('Oops, database error!');
    }finally{
        res.status(200).json(queryResult);
    }
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
app.post('api/groups/:group/request-to-join', async (req, res) => {
    const { uid, groupID } = req.body;
    let query = sqlQueries.addJoinRequest(uid, groupID);
    try {
        let queryResult = await mssql.queryDB(query);
    } catch (err) {
        res.status(500).send('Oops, database error!');
    }finally{
        res.status(200).json(queryResult);
    }
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
app.post('api/groups/:group/remove', async (req, res) => {
    const { uid, groupID } = req.body;
    let query = sqlQueries.deleteGroup(uid, groupID);
    try {
        let queryResult = await mssql.queryDB(query);
    } catch (err) {
        res.status(500).send('Oops, database error!');
    }finally{
        res.status(200).json(queryResult);
    }
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
app.post('api/groups/:group/remove-user', async (req, res) => {
    const { uid, groupID, userToRemove } = req.body;
    let query = sqlQueries.removeGroupUser(uid, groupID, userToRemove);
    try {
        let queryResult = await mssql.queryDB(query);
    } catch (err) {
        res.status(500).send('Oops, database error!');
    }finally{
        res.status(200).json(queryResult);
    }
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
app.post('api/groups/:group-name/swap-admin', async (req, res) => {
    const { uid, groupID, newAdminID } = req.body;
    let query = sqlQueries.swapGroupAdmin(uid, groupID, newAdminID);
    try {
        let queryResult = await mssql.queryDB(query);
    } catch (err) {
        res.status(500).send('Oops, database error!');
    }finally{
        res.status(200).json(queryResult);
    }
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
app.post('api/:group-name/create-new-thread', async (req, res) => {
    const { uid, groupID, text } = req.body;
    let query = sqlQueries.createThread(uid, groupID, utils.getISOtime(), title, text);
    try {
        let queryResult = await mssql.queryDB(query);
    } catch (err) {
        res.status(500).send('Oops, database error!');
    }finally{
        res.status(200).json(queryResult);
    }
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
app.post('api/:group-name/:thread-name/post', async (req, res) => {
    const { uid, threadID, text } = req.body;
    let query = sqlQueries.addThreadPost(uid, threadID, text, utils.getISOtime());
    try {
        let queryResult = await mssql.queryDB(query);
    } catch (err) {
        res.status(500).send('Oops, database error!');
    }finally{
        res.status(200).json(queryResult);
    }
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
app.post('api/:group-name/:post-name/mark-answered', async (req, res) => {
    const { uid, threadID } = req.body;
    try {
        let query = sqlQueries.markThreadAnswered(uid, threadID);
        let queryResult = await mssql.queryDB(query);
    } catch (err) {
        res.status(500).send('Oops, database error!');
    }finally{
        res.status(200).json(queryResult);
    }
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
app.post('api/:group-name/:post-name/unmark-answered', async (req, res) => {
    const { uid, threadID } = req.body;
    try {
        let query = sqlQueries.markThreadUnanswered(uid, threadID);
        let queryResult = await mssql.queryDB(query);
    } catch (err) {
        res.status(500).send('Oops, database error!');
    }finally{
        res.status(200).json(queryResult);
    }
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
app.post('api/:group-name/:post-name/delete', async (req, res) => {
    const { uid, threadID } = req.body;
    let query = sqlQueries.deleteThread(uid, threadID);
    try {
        let queryResult = await mssql.queryDB(query);
    } catch (err) {
        res.status(500).send('Oops, database error!');
    }finally{
        res.status(200).json(queryResult);
    }
});

//  POST delete-reply
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
app.post('api/:group-name/:post-name/delete-reply', async (req, res) => {
        const { uid, postID } = req.body;
        let query = sqlQueries.deleteThreadPost(uid, postID);
    try {
        let queryResult = await mssql.queryDB(query);
    } catch (err) {
        res.status(500).send('Oops, database error!');
    }finally{
        res.status(200).json(queryResult);
    }
});

/**
 *  addNotification
 * removeNotification
 * createUser
 * updateUserTime
 * addGroupUser
 * addGroupInstructor
 * removeGroupInstructor
 * setSticky
 * unSetSticky
 * editThreadPost

 */

 
 /**
  * 
  * 
  * PRECONDITIONS:
  * 
  * 
  * POSTCONDITIONS:
  * 
  */
 app.post('api/', async (req, res) => {
    const {  } = req.body;
    let query = sqlQueries.;
    try {
        let queryResult = await mssql.queryDB(query);
    } catch (err) {
        res.status(500).send('Oops, database error!');
    }finally{
        res.status(200).json(queryResult);
    }
});

/**
  * 
  */
 app.post('api/', async (req, res) => {
    const {  } = req.body;
    let query = sqlQueries.;
    try {
        let queryResult = await mssql.queryDB(query);
    } catch (err) {
        res.status(500).send('Oops, database error!');
    }finally{
        res.status(200).json(queryResult);
    }
});

/**
  * 
  */
 app.post('api/', async (req, res) => {
    const {  } = req.body;
    let query = sqlQueries.;
    try {
        let queryResult = await mssql.queryDB(query);
    } catch (err) {
        res.status(500).send('Oops, database error!');
    }finally{
        res.status(200).json(queryResult);
    }
});

/**
  * 
  */
 app.post('api/', async (req, res) => {
    const {  } = req.body;
    let query = sqlQueries.;
    try {
        let queryResult = await mssql.queryDB(query);
    } catch (err) {
        res.status(500).send('Oops, database error!');
    }finally{
        res.status(200).json(queryResult);
    }
});

/**
  * 
  */
 app.post('api/', async (req, res) => {
    const {  } = req.body;
    let query = sqlQueries.;
    try {
        let queryResult = await mssql.queryDB(query);
    } catch (err) {
        res.status(500).send('Oops, database error!');
    }finally{
        res.status(200).json(queryResult);
    }
});

/**
  * 
  */
 app.post('api/', async (req, res) => {
    const {  } = req.body;
    let query = sqlQueries.;
    try {
        let queryResult = await mssql.queryDB(query);
    } catch (err) {
        res.status(500).send('Oops, database error!');
    }finally{
        res.status(200).json(queryResult);
    }
});

/**
  * 
  */
 app.post('api/', async (req, res) => {
    const {  } = req.body;
    let query = sqlQueries.;
    try {
        let queryResult = await mssql.queryDB(query);
    } catch (err) {
        res.status(500).send('Oops, database error!');
    }finally{
        res.status(200).json(queryResult);
    }
});

/**
  * 
  */
 app.post('api/', async (req, res) => {
    const {  } = req.body;
    let query = sqlQueries.;
    try {
        let queryResult = await mssql.queryDB(query);
    } catch (err) {
        res.status(500).send('Oops, database error!');
    }finally{
        res.status(200).json(queryResult);
    }
});

/**
  * 
  */
 app.post('api/', async (req, res) => {
    const {  } = req.body;
    let query = sqlQueries.;
    try {
        let queryResult = await mssql.queryDB(query);
    } catch (err) {
        res.status(500).send('Oops, database error!');
    }finally{
        res.status(200).json(queryResult);
    }
});

/**
  * 
  */
 app.post('api/', async (req, res) => {
    const {  } = req.body;
    let query = sqlQueries.;
    try {
        let queryResult = await mssql.queryDB(query);
    } catch (err) {
        res.status(500).send('Oops, database error!');
    }finally{
        res.status(200).json(queryResult);
    }
});



app.listen(8000, () => { console.log('Listening on port 8000'); });