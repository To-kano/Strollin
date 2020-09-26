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
| Register a new user for database.<br>For non-professional user. | mail: String<br>password: String<br>pseudo: String <br>(optional) |       No      | accessToken: String |

- GET log in: ```POST /users/login```

| Description                         | Body                             | Require Token | Return              |
|-------------------------------------|----------------------------------|:-------------:|---------------------|
| Log in an user to get a valid token | mail: String<br>password: String |       No      | accessToken: String |

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
