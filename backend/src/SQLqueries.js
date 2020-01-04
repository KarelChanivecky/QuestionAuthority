// SQL QUERIES
const SQLqueries = {
    getProfile : 
    `SELECT userID, name, isInstructor, lastTimeActive 
    FROM dbo.users 
    WHERE userID = '${uid}'`,

    getGroupList: 
    `SELECT groupIdList.groupID, name
    FROM (SELECT groupID
        FROM dbo.enrollment enr
        WHERE userID = '6')  
        AS groupIdList
    JOIN dbo.groups gr ON gr.groupID = groupIdList.groupID`,

    getThreads:
    `IF ${groupID} IN 
        (SELECT groupID FROM dbo.enrollment 
        WHERE userID = ${uid})
    SELECT * FROM dbo.threads 
    WHERE groupID = '${groupID}'`,

    searchInThreads:`IF ${groupID} IN (SELECT groupID FROM dbo.enrollment WHERE userID = ${uid})
    SELECT * from dbo.posts WHERE textContent LIKE '%${searchQuery}%'`, 

    getGroupMembers: 
    `IF '2' = (SELECT adminID FROM dbo.groups WHERE groupID = '1')

    SELECT userIdList.userID, name, isInstructor, lastTimeActive
    FROM (SELECT userID
        FROM dbo.enrollment enr
        WHERE groupID = '1')  AS userIdList
    JOIN dbo.users usr ON usr.userID = userIdList.userID`,

    getGroupJoinRequests: 
    `IF '2' = (SELECT adminID FROM dbo.groups WHERE groupID = '1')

    SELECT userIdList.userID, name, isInstructor, lastTimeActive
    FROM (SELECT userID
        FROM dbo.joinRequests jn
        WHERE groupID = '3')  AS userIdList
    JOIN dbo.users usr ON usr.userID = userIdList.userID`,

    getThreadPosts:
    `IF '2' IN (SELECT groupID FROM dbo.enrollment WHERE userID = '1')  

    SELECT textContent, datePosted, lastEdited, postID
    FROM dbo.posts ps
    WHERE postID = '0'`,

    createNewUser: 
    `INSERT dbo.users (userID, name, isInstructor, lastTimeActive)
    VALUES (${uid}, ${name}, ${isINstructor}, ${lastTimeActive})`,

    updateUser:
    `UPDATE dbo.users
    SET userID =${uid}
    SET `,

};