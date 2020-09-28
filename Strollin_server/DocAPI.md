# STROLLIN REST API SERVER 

NOTE:

- The list is separated in Object Related.

- Each object will present the schema and the available request.

- Where full URLs are provided in responses they will be rendered as if service is running on 'http://' + IP_SERVER + ':' + PORT_SERVER + '/'.

- All request parameters must be contained in the body of the request except the token which must be in the header.

- A request which require token means that the request needs a valid token in its header to be used. The token is obtained when the client log in.

- Almost all number are exprimed as String.


INDEX:
======
- [USER RELATED](#USER-RELATED)
- [MESSAGE RELATED](#MESSAGE-RELATED)
- [CONVERSATION RELATED](#CONVERSATION-RELATED)
- [COURSE RELATED](#COURSE-RELATED)
- [LOCATION RELATED](#LOCATION-RELATED)
- [COMMENT RELATED](#COMMENT-RELATED)
- [TAGS RELATED](#TAGS-RELATED)


USER RELATED:
=============

**SCHEMA:**

- mail ```String```
- password ```String```
- creationDate ```Date```
- pseudo ```String```
- type ```String``` : "normal" or "professional"
- firstName ```String```
- lastName ```String```
- accessToken ```String```
- tags ```[s]```
- friendsList ```[userID]```
- friendsRequest ```[userID]```
- groups ```[[groupName, userID, ...]]```
- courseHistoric ```[courseID]```
- scoreCourse ```[{courseID, String, Date}]``` : score as String
- scoreLocation ```[{locationID, String, Date}]``` : score as String
- scoreComment ```[{commentID, String, Date}]``` : score as String
- socketID ```String```
- facebookID ```String```

<br>

**REQUESTS:**

- ADD new user for registration: ```POST /users/register```

| Description | Body | Require Token | Return |
|-|-|:-:|-|
| Register a new user for database.<br>For non-professional user.<br>Return a access token. | mail: String<br>password: String<br>pseudo: String <br>(optional) | No | accessToken: String |

- ADD a friend: ```POST /users/addFriend```

- ADD new tags in user's tags: ```POST /users/addTags```

- GET log in: ```GET /users/login```

| Description | Body | Require Token | Return |
|-|-|:-:|-|
| Log in an user to get a valid token | mail: String<br>password: String | No | accessToken: String |


- POST log in: ```GET /users/logout```

| Description | Body | Require Token | Return |
|-|-|:-:|-|
| Log out an user.<br>Unavailable the current token.| None | Yes | None |


- GET user's profile: ```GET /users/profile```

| Description | Body | Require Token | Return |
|-|-|:-:|-|
| Get the user's informations.<br>For the profile page.| None | Yes | profile: {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mail: String,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;firstName: String,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastName: String,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tags: [s],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;friendList: [userID],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type: String,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;historic: [courseID],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;scoreCourse: [{courseID, score, Date}],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;scoreLocation: [{locationID, score, Date}],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;scoreComment: [{commentID, score, Date}]<br>} |

- GET user's tags: ```GET /users/getTags```

- DEL user's account: ```DEL /users/deleteAccount```

| Description | Body | Require Token | Return |
|-|-|:-:|-|
| Delete an user's account.| password: String | Yes | None |

- DEL user's friend: ```DEL /users/removeFriend```

- DEL user's tags: ```DEL /users/removeTags```

MESSAGE RELATED:
================

**SCHEMA:**

- expeditor ```userID```
- conversation ```conversationID```
- creationDate ```Date```
- type ```String``` : "message" or "image" or "video"
- message ```String```

<br>

**REQUESTS:**

- ADD new message: ```POST /message/postMessage```

- GET messages: ```GET /message/getMessage```

- DEL message: ```DEL /message/removeMessage```


CONVERSATION RELATED:
=====================

**SCHEMA:**

- participants ```[{userID, Date}]``` : exit Date of a user to stop message updates
- name ```String```
- messageList ```[messageID]```

<br>

**REQUESTS:**

- ADD new conversation: ```POST /conversation/postConversation```

- GET conversations: ```GET /conversation/getConversation```

- DEL conversation: ```DEL /conversation/removeConversation```



COURSE RELATED:
===============

**SCHEMA:**

- locations ```[locationID]```
- score ```String```
- userScore ```[userID]```
- used ```String``` : number of usage of the course
- author ```String```
- creationDate ```Date```
- timetable ```String```
- commentList ```[commentID]```
- tags ```[tagID]```

<br>

**REQUESTS:**

- ADD new course: ```POST /course/postCourse```

- GET course: ```GET /course/getCourse```

- DEL course: ```DEL /course/removeCourse```



LOCATION RELATED:
=================

**SCHEMA:**

- name ```String```
- score ```String```
- userScore ```[userID]```
- visited ```String``` : number of visit of the location
- coordinate ```[Float, Float]```
- address ```String```
- description ```String```
- photo ```[String]```
- timetable ```String```
- commentList ```[commentID]```
- tags ```[tagID]```

<br>

**REQUESTS:**

- ADD new location: ```POST /location/postLocation```

- GET location: ```GET /location/getLocation```

- DEL location: ```DEL /location/removeLocation```



COMMENT RELATED:
================

**SCHEMA:**

<br>

**REQUESTS:**




TAGS RELATED:
=============

**SCHEMA:**


<br>

**REQUESTS:**

