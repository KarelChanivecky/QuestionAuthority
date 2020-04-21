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
    return `INSERT dbo.notifications(userID, senderID, text, timeSent)
    VALUES ('${toID}', '${fromID}', '${text}', '${time}')`;
}

export function getNotifications(uid){
    return `
    select u.name as sender, timeSent, text, from 
    dbo.notifications n
    join users u on u.userID = n.senderID
    join notificationTypes nt on n.notificationType = nt.ID
    where n.userID = ${uid}
    ORDER BY notificationID ASC`;
}

export function removeNotification(uid, notifID){
    return `IF '${uid}' = (SELECT userID FROM dbo.notifications WHERE notificationID = ${notifID})
    DELETE FROM dbo.notifications where notificationID = ${notifID}`;
}
    
export function getGroupList(uid){ 
    return `SELECT groupIdList.groupID, name
    FROM (SELECT groupID
        FROM dbo.enrollment enr
        WHERE userID = '${uid}')  
        AS groupIdList
    JOIN dbo.groups gr ON gr.groupID = groupIdList.groupID`;
}

export function getThreads(uid, groupID){
    return `IF ${groupID} IN 
        (SELECT groupID FROM dbo.enrollment 
        WHERE userID = '${uid}')
    SELECT * FROM dbo.threads 
    WHERE groupID = '${groupID}'`;
}

export function searchInThreads(uid, groupID, searchQuery){
    return `IF EXISTS (SELECT * FROM qa.dbo.enrollment WHERE userID = '${uid}' AND groupID = ${groupID})
    SELECT threadID,  title, solved, sticky, orderPosition
        FROM qa.dbo.threads
        WHERE title LIKE '%${searchQuery}%' AND groupID = ${groupID}

    UNION

    SELECT threadID, title, solved, sticky, orderPosition FROM qa.dbo.threads WHERE threadID IN
    (SELECT DISTINCT threadID FROM qa.dbo.posts WHERE textContent LIKE '%${searchQuery}%') AND groupID = ${groupID}

    ORDER BY sticky, orderPosition`;
} 

export function getGroupMembers(uid, groupID){ 
    return `IF '${uid}' = (SELECT adminID FROM dbo.groups WHERE groupID = ${groupID})

    SELECT userIdList.userID, name, isInstructor, lastTimeActive
    FROM (SELECT userID
        FROM dbo.enrollment enr
        WHERE groupID = ${groupID})  AS userIdList
    JOIN dbo.users usr ON usr.userID = userIdList.userID`;
}

export function getGroupJoinRequests(uid, groupID){ 
    return `IF '${uid}' = (SELECT adminID FROM dbo.groups WHERE groupID = ${groupID})

    SELECT userIdList.userID, name, isInstructor, lastTimeActive
    FROM (SELECT userID
        FROM dbo.joinRequests jn
        WHERE groupID = ${groupID})  AS userIdList
    JOIN dbo.users usr ON usr.userID = userIdList.userID`;
}

export function createUser(uid, name, isInstructor, time, email = null){
    return `INSERT dbo.users (userID, name, isInstructor, lastTimeActive, email)
    VALUES ('${uid}', '${name}', ${isInstructor}, '${time}', '${email}')`;
}

export function updateUser(uid, name, email = null){
    return `UPDATE dbo.users
    SET name = '${name}',
        email = '${email}'
    WHERE userID = '${uid}'`;
}

export function updateUserTime(uid, time){
    return `UPDATE dbo.user
    SET lastTimeActive = '${time}'
    WHERE userID = '${uid}'`;
}

export function deleteUser(uid){
    return `
    DELETE FROM dbo.users
    WHERE userID = '${uid}'
    
    UPDATE dbo.posts
    SET authorID =  NULL
    WHERE authorID = '${uid}'

    UPDATE dbo.threads
    SET authorID =  NULL
    WHERE authorID = '${uid}'`;
}

export function createGroup(uid, name){
    return `IF (SELECT isInstructor FROM dbo.users WHERE userID = '${uid}') = 1
    INSERT dbo.groups(name, adminID)
    VALUES ('${name}', '${uid}')    
    INSERT dbo.instructors(userID, groupID)
    VALUES ('${uid}', (SELECT groupID FROM dbo.groups WHERE name = '${name}'))
    INSERT dbo.enrollment(userID, groupID)
    VALUES ('${uid}', (SELECT groupID FROM dbo.groups WHERE name = '${name}'))`;
}

export function addGroupUser(uid, groupID, newUserID){ // uid is the active user(must be group admin)
    return `IF EXISTS(SELECT userID FROM dbo.joinRequests WHERE userID = '${newUserID}' AND groupID = ${groupID})
    AND ('${uid}' = (SELECT adminID FROM dbo.groups WHERE groupID = ${groupID}))
    INSERT dbo.enrollment (userID, groupID)
    VALUES ('${newUserID}', ${groupID})
    
    DELETE FROM dbo.joinRequests WHERE userID = '${newUserID}' AND groupID = ${groupID}`;
}

export function addJoinRequest(uid, groupID){
    return `IF NOT (EXISTS (SELECT userID FROM dbo.enrollment WHERE userID = '${uid}' AND groupID = ${groupID}))
    INSERT dbo.joinRequests(userID, groupID)
    VALUES ('${uid}', ${groupID})`;
}

export function removeGroupUser(uid, groupID, userToDeleteID){ // go ahead if uid is admin, or uid is removing itself
    return `IF '${uid}' = (SELECT adminID FROM dbo.groups WHERE groupID = ${groupID})
    OR ('${uid}' = '${userToDeleteID}')
    DELETE FROM dbo.enrollment
    WHERE userID = '${userToDeleteID}' AND groupID = ${groupID}`;
}

export function addGroupInstructor(uid, groupID, instructorID){
    return `IF' ${uid}' = (SELECT adminID FROM dbo.groups WHERE groupID = ${groupID})
    AND (SELECT isInstructor FROM dbo.users WHERE userID = '${instructorID}') = 1
    INSERT dbo.instructors (userID, groupID)
    VALUES ('${instructorID}', ${groupID})
    INSERT dbo.enrollment (userID, groupID)
    VALUES ('${instructorID}', ${groupID})`;
}

export function removeGroupInstructor(uid, groupID, instructorID){
    return `IF '${uid}' = (SELECT adminID FROM dbo.groups WHERE groupID = ${groupID})
    DELETE FROM dbo.instructors
    WHERE userID = '${instructorID}' AND groupID = ${groupID}`;
}
    
export function swapGroupAdmin(uid, groupID, newAdminID){
    return `IF '${uid}' = (SELECT adminID FROM dbo.groups WHERE groupID = ${groupID})
    UPDATE dbo.groups
    SET adminID = '${newAdminID}'
    WHERE groupID = ${groupID}`;
}

export function deleteGroup(uid, groupID){
    return `IF '${uid}' = (SELECT adminID FROM dbo.groups WHERE groupID = ${groupID})
    DELETE FROM dbo.groups WHERE groupID = ${groupID}`;
}

export function createThread(uid, groupID, datePosted, title, text){
    return `
    IF EXISTS(SELECT userID FROM dbo.enrollment WHERE userID = '${uid}' AND groupID = ${groupID})
    BEGIN
    DECLARE @orderPosition int;
    SET @orderPosition = NEXT VALUE FOR qa.dbo.threadOrder;
    INSERT dbo.threads (authorID, groupID, title, datePosted, orderPosition)
    VALUES ('${uid}', ${groupID}, '${title}', '${datePosted}', @orderPosition)

    DECLARE @threadID int;
    SET @threadID = (SELECT threadID FROM dbo.threads 
    WHERE authorID = '${uid}' AND groupID = ${groupID} AND title = '${title}' AND datePosted = '${datePosted}')

    INSERT dbo.posts (authorID, threadID, text, datePosted)
    VALUES('${uid}', @threadID, '${text}', '${datePosted}')
    END;
    `;
}

export function getThread(uid, threadID){
    return `DECLARE @threadGroupID varchar(50);
    SET @threadGroupID = (SELECT groupID FROM dbo.threads WHERE threadID = ${threadID})
    
    IF EXISTS (SELECT * FROM dbo.enrollment WHERE userID = ${uid} AND groupID = @threadGroupID)
    SELECT postID, authorId, name as author, text, datePosted, lastEdited FROM dbo.posts p
    join dbo.users u on u.userID = p.authorId
    WHERE threadID = ${threadID}
    ORDER BY threadID ASC`;
}

export function markThreadAnswered(uid, threadID){
    return `DECLARE @threadGroupID varchar(50);
    SET @threadGroupID = (SELECT groupID FROM dbo.threads WHERE threadID = ${threadID})

    IF '${uid}' = (SELECT authorID FROM dbo.threads WHERE threadID = ${threadID}) 
    OR EXISTS(SELECT * FROM dbo.instructors WHERE userID = '${uid}' AND groupID = @threadGroupID)
    UPDATE dbo.threads
    SET solved = 1
    WHERE threadID = ${threadID}`;
}

export function markThreadUnanswered(uid, threadID){
    return `DECLARE @threadGroupID varchar(50);
    SET @threadGroupID = (SELECT groupID FROM dbo.threads WHERE threadID = ${threadID})

    IF '${uid}' = (SELECT authorID FROM dbo.threads WHERE threadID = ${threadID}) 
    OR EXISTS(SELECT * FROM dbo.instructors WHERE userID = '${uid}' AND groupID = @threadGroupID)
    UPDATE dbo.threads
    SET solved = 0
    WHERE threadID = ${threadID}`;
}

export function setSticky(uid, threadID){
    return `DECLARE @threadGroupID varchar(50);
    SET @threadGroupID = (SELECT groupID FROM dbo.threads WHERE threadID = ${threadID});
    
    IF '${uid}' = (SELECT adminID FROM dbo.groups WHERE groupID = @threadGroupID)
    UPDATE dbo.threads
    SET sticky = 1
    WHERE threadID = ${threadID}
    `;
}

export function unSetSticky(uid, threadID){
    return `DECLARE @threadGroupID varchar(50);
    SET @threadGroupID = (SELECT groupID FROM dbo.threads WHERE threadID = ${threadID});
    
    IF '${uid}' = (SELECT adminID FROM dbo.groups WHERE groupID = @threadGroupID)
    UPDATE dbo.threads
    SET sticky = 0
    WHERE threadID = ${threadID}`;
}

export function deleteThread(uid, threadID){
    return `DECLARE @threadGroupID varchar(50);
    SET @threadGroupID = (SELECT groupID FROM dbo.threads WHERE threadID = ${threadID});
    
    IF '${uid}' = (SELECT adminID FROM dbo.groups WHERE groupID = @threadGroupID) 
    OR '${uid}' = (SELECT authorID FROM dbo.threads WHERE threadID = ${threadID})
    DELETE FROM dbo.threads
    WHERE threadID = ${threadID}`;
}

export function addThreadPost(uid, threadID, text, datePosted){
    return `DECLARE @threadGroupID int;
    SET @threadGroupID = (SELECT groupID FROM dbo.threads WHERE threadID = ${threadID});
    
    IF EXISTS(SELECT * FROM dbo.enrollment WHERE userID = '${uid}' AND groupID = @threadGroupID)  AND
    EXISTS(SELECT * FROM dbo.threads WHERE threadID = ${threadID})
    
    INSERT dbo.posts (threadID, authorID, text, datePosted)
    VALUES (${threadID}, '${uid}', '${text}', '${datePosted}')`;
}

export function editThreadPost(uid, postID, text, date){
    return `IF '${uid}' = (SELECT authorID FROM dbo.posts WHERE postID = ${postID})
    UPDATE dbo.posts
    SET text = '${text}',
    lastEdited = '${date}'
    WHERE postID = ${postID}`;
}

export function deleteThreadPost(uid, postID){
    return `
    DECLARE @threadID int;
    SET @threadID = (SELECT threadID FROM dbo.posts WHERE postID = ${postID})

    DECLARE @threadGroupID varchar(50);
    SET @threadGroupID = (SELECT groupID FROM dbo.threads WHERE threadID = @threadID)
    
    IF '${uid}' = (SELECT adminID FROM dbo.groups WHERE groupID = @threadGroupID)
    OR '${uid}' = (SELECT authorID FROM dbo.posts WHERE postID = ${postID})
    
    DELETE FROM dbo.posts WHERE postID = ${postID}`;
}
