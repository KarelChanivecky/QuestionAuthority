/**
 * Package template.
 */
export function ReqPackage(uid, text = null, postID = null,
    threadID = null, title = null, groupID = null, userToRemove = null, name = null,
    email = null, searchQuery = null, newMemberID = null, instructorID = null, isInstructor = null, newAdminID = null) {
    this.uid = uid;
    this.text = text;
    this.postID = postID;
    this.threadID = threadID;
    this.title = title;
    this.groupID = groupID;
    this.userToRemove = userToRemove;
    this.name = name;
    this.email = email;
    this.searchQuery = searchQuery;
    this.newMemberID = newMemberID;
    this.isInstructor = isInstructor;
    this.instructorID = instructorID;
    this.newMemberID = newAdminID;
}

/**
 * Remove nulls.
 */
export function prepPackage(pack) {
    const pairs = pack.entries();
    if (pairs.length === 1) {
        return pairs[0].fromEntries();
    }
    if (pairs[0][1] === null) {
        return prepPackage(pairs.slice(1).fromEntries());
    }
    return {...pairs[0].fromEntries(), ...prepPackage(pairs.slice(1).fromEntries())};
}
