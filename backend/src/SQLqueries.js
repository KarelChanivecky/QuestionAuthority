// SQL QUERIES
/**
 * getProfile
 * addNotification
 * removeNotification
 * getGroupList
 * getThreads
 * searchInThreads
 * getGroupMembers
 * getGroupJoinRequests
 * getThreadPosts
 * createUser
 * updateUser
 * updateUserTime
 * deleteUser
 * createGroup
 * addGroupUser
 * addJoinRequest
 * removeGroupUser
 * addGroupInstructor
 * removeGroupInstructor
 * swapGroupAdmin
 * deleteGroup
 * createThread
 * getThread
 * markThreadAnswered
 * markThreadUnanswered
 * setSticky
 * unSetSticky
 * deleteThread
 * addThreadPost
 * editThreadPost
 * deleteThreadPost
 */

export function getProfile(uid){
    return `SELECT userID, name, isInstructor, lastTimeActive 
    FROM dbo.users 
    WHERE userID = '${uid}'`;
}

export function addNotification(fromID, toID, text, time){
    return `INSERT dbo.notifications(userID, text, senderID, timeSent)
    VALUES (${toID}), ${fromID}, ${text}, ${time})`;
}

export function removeNotification(uid, notifID){
    return `IF uid = (SELECT userID FROM dbo.notifications WHERE userID = ${uid})
    DELETE FROM dbo.notifications where notificationID = ${notifID}`;
}
    
export function getGroupList(uid){ 
    return `SELECT groupIdList.groupID, name
    FROM (SELECT groupID
        FROM dbo.enrollment enr
        WHERE userID = ${uid})  
        AS groupIdList
    JOIN dbo.groups gr ON gr.groupID = groupIdList.groupID`;
}

export function getThreads(uid, groupID){
    return `IF ${groupID} IN 
        (SELECT groupID FROM dbo.enrollment 
        WHERE userID = ${uid})
    SELECT * FROM dbo.threads 
    WHERE groupID = '${groupID}'`;
}

export function searchInThreads(uid, groupID, searchQuery){
    return `IF ${groupID} IN 
    (SELECT groupID FROM dbo.enrollment WHERE userID = ${uid})
    SELECT * from dbo.posts
    WHERE textContent LIKE ${searchQuery}`;
} 

export function getGroupMembers(uid, groupID){ 
    return `IF ${uid} = (SELECT adminID FROM dbo.groups WHERE groupID = ${groupID})

    SELECT userIdList.userID, name, isInstructor, lastTimeActive
    FROM (SELECT userID
        FROM dbo.enrollment enr
        WHERE groupID = ${groupID})  AS userIdList
    JOIN dbo.users usr ON usr.userID = userIdList.userID`;
}

export function getGroupJoinRequests(uid, groupID){ 
    return `IF ${uid} = (SELECT adminID FROM dbo.groups WHERE groupID = ${groupID})

    SELECT userIdList.userID, name, isInstructor, lastTimeActive
    FROM (SELECT userID
        FROM dbo.joinRequests jn
        WHERE groupID = ${groupID})  AS userIdList
    JOIN dbo.users usr ON usr.userID = userIdList.userID`;
}

export function getThreadPosts(uid, name, postID){
    return `IF ${groupID} IN (SELECT groupID FROM dbo.enrollment WHERE userID = ${uid})  

    SELECT textContent, datePosted, lastEdited, postID
    FROM dbo.posts ps
    WHERE postID = ${postID}
    ORDER BY threadID ASC`;
}

export function createUser(uid, name, isInstructor, time, email = null){ 
    return `INSERT dbo.users (userID, name, isInstructor, lastTimeActive, email)
    VALUES (${uid}, ${name}, ${isInstructor}, ${time}, ${email})`;
}

export function updateUser(uid, name, time, email = null){
    return `UPDATE dbo.users
    SET userID = ${uid}
    SET name = ${name}
    SET lastTimeActive = ${time}
    SET email = ${email}
    WHERE userID = uid`;
}

export function updateUserTime(uid, time){
    return `UPDATE dbo.user
    SET lastTimeActive = ${time}
    WHERE userID = ${uid}`;
}

export function deleteUser(uid, userToDeleteID){
    return `DELETE 
    FROM dbo.users
    WHERE userID = ${uid}`;
}

export function createGroup(uid, name){
    return `IF (SELECT isInstructor FROM dbo.users WHERE userID = ${uid}) = 1
    INSERT dbo.groups(name, adminID)
    VALUES (${name}, ${uid})
    INSERT dbo.instructors(userID, groupID)
    VALUES (${uid}, ${groupID})`;
}

export function addGroupUser(uid, groupID, newUserID){ // uid is the active user(must be group admin)
    return `IF (SELECT * FROM dbo.joinRequests WHERE userID = ${uid} AND groupID = ${groupID}) EXISTS
    INSERT dbo.enrollment (userID, groupID)
    VALUES (${newUserID, groupID})
    
    DELETE FROM dbo.joinRequests WHERE userID = ${newUserID} AND groupID = ${groupID}`;
}

export function addJoinRequest(uid, groupID){
    return `IF (SELECT * FROM dbo.enrollment WHERE userID = ${uid} AND groupID = ${groupID})
    NOT EXISTS OR (SELECT * FROM dbo.joinRequests WHERE userID = ${uid} AND groupID = ${groupID}) NOT EXISTS
    INSERT dbo.joinRequests(userID, groupID)
    VALUES (${uid}, ${groupID})`;
}

export function removeGroupUser(uid, groupID, userToDeleteID){ // go ahead if uid is admin, or uid is removing itself
    return `IF ${uid} = (SELECT adminID FROM dbo.group WHERE groupID = ${groupID})
    OR (${uid} = ${userToDeleteID})
    DELETE FROM dbo.enrollment
    WHERE userID = ${userToDeleteID} AND groupID = ${groupID}`;
}

export function addGroupInstructor(uid, groupID, instructorID){
    return `IF ${uid} = (SELECT adminID) FROM dbo.groups WHERE groupID = ${groupID})
    INSERT dbo.instructors (userID, groupID)
    VALUES (${instructorID, groupID})
    INSERT dbo.enrollment (userID, groupID)
    VALUES (${instructorID, groupID})`;
}

export function removeGroupInstructor(uid, groupID, instructorID){
    return `IF ${uid} = (SELECT adminID FROM dbo.groups WHERE groupID = ${groupID})
    DELETE FROM dbo.instructors
    WHERE userID = ${instructorID} AND groupID = ${groupID}`;
}
    
export function swapGroupAdmin(uid, groupID, newAdminID){
    return `IF ${uid} = (SELECT adminID FROM dbo.groups WHERE groupID = ${groupID})
    UPDATE dbo.groups
    SET adminID = ${newAdminID}
    WHERE groupID = ${groupID}`;
}

export function deleteGroup(uid, groupID){
    return `IF ${uid} = (SELECT adminID FROM dbo.groups WHERE groupID = ${groupID})
    DELETE FROM dbo.groups WHERE groupID = ${groupID}`;
}

export function createThread(uid, groupID, datePosted, title, text){
    return `INSERT dbo.threads (authorID, groupID, title, datePosted, orderPosition)
    VALUES (${uid}, ${groupID}, ${title}, ${datePosted}, (SELECT NEXT VALUE FOR qa.dbo.threadOrder))
    GO

    DECLARE @threadID int;
    SET @threadID = (SELECT threadID FROM dbo.threads 
    WHERE authorID = ${userID} AND groupID = ${groupID}) AND title = ${title}

    INSERT dbo.posts (authorID, threadID, text, datePosted)
    VALUES(${uid}, @threadID, ${text}, ${datePosted})
    `;
}

export function getThread(uid, threadID){
    return `DECLARE @threadGroupID varchar(50);
    SET @threadGroupID = (SELECT groupID FROM dbo.threads WHERE threadID = ${threadID})
    
    IF (SELECT * FROM dbo.enrollment WHERE userID = ${uid} AND groupID = @threadGroupID)
    SELECT * FROM dbo.posts WHERE threadID = ${threadID}
    ORDER BY threadID ASC`;
}

export function markThreadAnswered(uid, threadID){
    return `IF ${uid} = (SELECT authorID FROM dbo.threads WHERE threadID = ${threadID}) 
    OR (SELECT * FROM dbo.instructors WHERE userID = ${uid} AND groupID = ${groupID})
    UPDATE dbo.threads
    SET solved = 1
    WHERE threadID = ${threadID}`;
}

export function markThreadUnanswered(){
    return `IF ${uid} = (SELECT authorID FROM dbo.threads WHERE threadID = ${threadID}) 
    OR (SELECT * FROM dbo.instructors WHERE userID = ${uid} AND groupID = ${groupID})
    UPDATE dbo.threads
    SET solved = 0
    WHERE threadID = ${threadID}`;
}

export function setSticky(uid, threadID){
    return `DECLARE @threadGroupID varchar(50);
    SET @threadGroupID = (SELECT groupID FROM dbo.threads WHERE threadID = ${threadID});
    
    IF ${uid} = (SELECT adminID FROM dbo.groups WHERE groupID = @threadGroupID)
    UPDATE dbo.threads
    SET sticky = 1
    WHERE threadID = ${threadID}
    `;
}

export function unSetSticky(){
    return `DECLARE @threadGroupID varchar(50);
    SET @threadGroupID = (SELECT groupID FROM dbo.threads WHERE threadID = ${threadID});
    
    IF ${uid} = (SELECT adminID FROM dbo.groups WHERE groupID = @threadGroupID)
    UPDATE dbo.threads
    SET sticky = 0
    WHERE threadID = ${threadID}`;
}

export function deleteThread(uid, threadID){
    return `DECLARE @threadGroupID varchar(50);
    SET @threadGroupID = (SELECT groupID FROM dbo.threads WHERE threadID = ${threadID});
    
    IF ${uid} = (SELECT adminID FROM dbo.groups WHERE groupID = @threadGroupID) 
    OR ${uid} = (SELECT authorID FROM dbo.threads WHERE threadID = ${threadID})
    DELETE FROM dbo.threads
    WHERE threadID = ${threadID}`;
}

export function addThreadPost(uid, threadID, text, datePosted){
    return `DECLARE@ threadGroupID varchar(50);
    SET @threadGroupID = (SELECT groupID FROM dbo.threads WHERE threadID = ${threadID});
    
    IF (SELECT * FROM dbo.enrollment WHERE userID = ${uid} AND groupID = @threadGroupID) AND
    (SELECT * FROM dbo.threads WHERE threadID = ${threadID}) EXISTS
    
    INSERT dbo.posts (threadID, authorID, text, datePosted)
    VALUES (${threadID}, ${uid}, ${text}, ${datePosted})`;
}

export function editThreadPost(uid, postID, text, date){
    return `IF ${uid} = (SELECT authorID FROM dbo.posts WHERE postID = ${postID})
    UPDATE dbo.posts
    SET text = ${text}
    SET date = ${date}
    WHERE postID = ${postID}`;
}

export function deleteThreadPost(uid, postID){
    return `
    DECLARE @threadID;
    SET @threadID = (SELECT threadID FROM dbo.posts WHERE postID = ${postID})

    DECLARE @threadGroupID varchar(50);
    SET @threadGroupID = (SELECT groupID FROM dbo.threads WHERE threadID = ${threadID})
    
    IF uid = (SELECT adminID FROM dbo.groups WHERE groupID = @threadGroupID)
    OR uid = (SELECT authorID FROM dbo.posts WHERE postID = ${postID})
    
    DELETE FROM dbo.posts WHERE postID = ${postID}`;
}
