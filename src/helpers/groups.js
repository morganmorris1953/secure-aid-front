/*
Helper Enum to check if a user is of a certain Group type.

This should help with readability.

Example One
----------------------------------------------------------

if (user && user.isVeteran()) {
    console.log("veteran")
  }

Versus:

if (user.group.id==1){
    console.log("veteran")
}

Example Two
----------------------------------------------------------

{user && user.isVeteran() && <Display This tag/>}

Versus:

{user && user.group.id==1 && <Display This tag/>}
*/

class Group {
    static Veteran = new Group({ id: 1, name: "Veteran" })
    static Recipient = new Group({ id: 2, name: "Recipient" })
    static Provider = new Group({ id: 3, name: "Provider" })

    constructor({ id, name }) {
        this.id = id
        this.name = name
    }

    check(group) {
        return (group.id === this.id) && (group.name === this.name)
    }
}

class User {
    constructor({ id, user_id, first_name, last_name, email, username, group, ...extra }) {
        this.id = id
        this.userID = user_id
        this.firstName = first_name
        this.lastName = last_name
        this.email = email
        this.username = username
        this.group = group
        this.extra = extra
    }

    isVeteran() {
        return Group.Veteran.check(this.group)
    }
    isRecipient() {
        return Group.Recipient.check(this.group)
    }
    isProvider() {
        return Group.Provider.check(this.group)
    }
}


export default User;