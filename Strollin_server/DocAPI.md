# STROLLIN REST API SERVER 

NOTE:
- The list of available request is separated in Object Related.

- Where full URLs are provided in responses they will be rendered as if service is running on 'http://' + IP_SERVER + ':' + PORT_SERVER + '/'.

- All request parameters must be contained in the body of the request except the token which must be in the header.

- A request which require token means that the request needs a valid token in its header to be used. The token is obtained when the client log in.


INDEX:
======
- [USER RELATED](#USER-RELATED)
- [MESSAGE RELATED](#MESSAGE-RELATED)
- [CONVERSATION RELATED](#CONVERSATION-RELATED)
- [COURSE RELATED](#COURSE-RELATED)
- [LOCATION RELATED](#LOCATION-RELATED)
- [COMMENT RELATED](#COMMENT-RELATED)


USER RELATED:
=============

- POST new user for registration: ```POST /users/register```

| Description                                                     | Body                                                              | Require Token | Return              |
|-----------------------------------------------------------------|-------------------------------------------------------------------|:-------------:|---------------------|
| Register a new user for database.<br>For non-professional user.<br>Return a access token. | mail: String<br>password: String<br>pseudo: String <br>(optional) |       No      | accessToken: String |


- GET log in: ```GET /users/login```

| Description                         | Body                             | Require Token | Return              |
|-------------------------------------|----------------------------------|:-------------:|---------------------|
| Log in an user to get a valid token | mail: String<br>password: String |       No      | accessToken: String |


- POST log in: ```POST /users/logout```

| Description                         | Body                             | Require Token | Return              |
|-------------------------------------|----------------------------------|:-------------:|---------------------|
| Log out an user.<br>Unavailable the current token.| None |       Yes      | None |


- GET user's profile: ```GET /users/logout```

| Description                         | Body                             | Require Token | Return              |
|-------------------------------------|----------------------------------|:-------------:|---------------------|
| Get the user's informations.<br>For the profile page.| None |       Yes      | profile: {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mail: String,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;firstName: String,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastName: String,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tags: [tagID],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;friendList: [userID],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type: String,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;historic: [courseID],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;scoreCourse: [{courseID, score, Date}],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;scoreLocation: [{locationID, score, Date}],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;scoreComment: [{commentID, score, Date}]<br>} |

- DEL user's account: ```DEL /users/delete```

| Description                         | Body                             | Require Token | Return              |
|-------------------------------------|----------------------------------|:-------------:|---------------------|
| Delete an user's account.| password: String | Yes | None |


MESSAGE RELATED:
================


CONVERSATION RELATED:
=====================


COURSE RELATED:
===============


LOCATION RELATED:
=================


COMMENT RELATED:
================
