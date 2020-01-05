import express, { request } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import * as mssql from './mssql';
import * as utilities from './utilities';

// EXPRESS
const app = express();  // initialize express server
app.use(express.static(path.join(__dirname, '/build')));  // static requests directed to react
app.use(bodyParser.json());  // parse package body with json


// REQUEST MANAGMENT
/**
 * GET:
 * - profile
 * - group-list
 * - post-list
 * - search-post-list
 * - member-list
 * - join-requests
 * - post-content
 * 
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
    try {
        let queryResult = await mssql.selectFromDB();
    } catch (err) {
        res.status(500).send('Oops, database error!');
    }
    res.status(200).json(queryResult);
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
    try{
        let queryResult = await selectFromDB( );
    } catch (err){
        res.status(500).send('Oops, database error!');
    }
    res.status(200).json(queryResult);
    return queryResult;
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
    const {uid, groupID } = req.body;
    try{
        let queryResult = await selectFromDB();
    } catch (err){
        res.status(500).send('Oops, database error!');
    }
    res.status(200).json(queryResult);
    return queryResult;
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
    try{
        let queryResult = await selectFromDB();
    } catch (err){
        res.status(500).send('Oops, database error!');
    }
    res.status(200).json(queryResult);
    return queryResult;
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
app.get('api/:group/members', async (req, res) => {
    const { uid, groupID } = req.body;
    try{
        let queryResult = await selectFromDB();
    } catch (err){
        res.status(500).send('Oops, database error!');
    }
    res.status(200).json(queryResult);
    return queryResult;
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
app.get('api/:group/join-requests', async (req, res) => {
    const { uid } = req.body;
    try{
        let queryResult = await selectFromDB();
    } catch (err){
        res.status(500).send('Oops, database error!');
    }
    res.status(200).json(queryResult);
    return queryResult;
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
app.get('api/:group/posts', async (req, res) => {
    const { uid } = req.body;
    try{
        let queryResult = await selectFromDB();
    } catch (err){
        res.status(500).send('Oops, database error!');
    }
    res.status(200).json(queryResult);
    return queryResult;
});

/**
 * POST:
 * 
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
 */

// template POST
//  app.post('api/', async (req, res) => {

// });

// POST create profile
/**
 * PRECONDITIONS:
 *      body must contain:
 *      string uid: the current user id
 * 
 * POST-CONDITIONS:
 *      will create the user's profile
 */
app.post('api/:user/create', async (req, res) => {

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
app.post('api/user/update', async (req, res) => {

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
app.post('api/user/delete', async (req, res) => {

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
app.post('api/:group/request-to-join', async (req, res) => {

});

//  POST delete-group
/**
 * PRECONDITIONS:
 *      body must contain:
 *      string uid: the current user id
 *      string groupToDeleteID: the ID of the group to be removed
 * 
 * POST-CONDITIONS:
 *      will delete the 
 *      if uid belongs to the group admin
 * 
 *      else if not authorized, will return an error message
 *      else if any of the given IDs does not exist, will return an error message
 *          
 */
app.post('api/groups/remove', async (req, res) => {

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
app.post('api/:group-name/remove-user', async (req, res) => {

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
app.post('api/:group-name/swap-admin', async (req, res) => {

});
//  POST create-post
/**
 * PRECONDITIONS:
 *      body must contain:
 *      string uid: the current user id
 *      string groupID: the group ID
 *      string text: the reply text
 * 
 * POST-CONDITIONS:
 *      will create a new post
 *      if any of the given IDs does not exist, will return an error message
 *          
 */
app.post('api/:group-name/create-new-post', async (req, res) => {

});

//  POST reply-to-post
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
app.post('api/:group-name/:post-name/reply', async (req, res) => {

});

//  POST mark-answered
/**
 * PRECONDITIONS:
 *      body must contain:
 *      string uid: the current user id
 *      string groupID: the group ID
 *      string postID: the post ID
 * 
 * POST-CONDITIONS:
 *      will mark the post as answered 
 *      if uid belongs to one of the group instructors
 * 
 *      else if not authorized, will return an error message
 *      else if any of the given IDs does not exist, will return an error message
 *          
 */
app.post('api/:group-name/:post-name/mark-answered', async (req, res) => {

});

//  POST unmark-answered
/**
 * PRECONDITIONS:
 *      body must contain:
 *      string uid: the current user ID
 *      string groupID: the group ID
 *      string postID: the post ID
 * 
 * POST-CONDITIONS:
 *      will mark the post as not answered 
 *      if uid belongs to the post author
 * 
 *      else if not authorized, will return an error message
 *      else if any of the given IDs does not exist, will return an error message
 *          
 */
app.post('api/:group-name/:post-name/unmark-answered', async (req, res) => {

});

//  POST delete-post
/**
 * PRECONDITIONS:
 *      body must contain:
 *      string uid: the current user id
 *      string groupID: the group ID
 *      string postID: the post ID
 * 
 * POST-CONDITIONS:
 *      will delete the given post
 *      if uid belongs to one of the group instructors, or uid is the post's author's id
 * 
 *      else if not authorized, will return an error message
 *      else if any of the given IDs does not exist, will return an error message
 *          
 */
app.post('api/:group-name/:post-name/delete', async (req, res) => {

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

});

app.listen(8000, () => { console.log('Listening on port 8000'); });