# STROLLIN REST API SERVER 

NOTE:

- The list is separated in Object Related.

- Each object will presents the schema and the available requests.

- Where full URLs are provided in responses they will be rendered as if service is running on 'http://' + IP_SERVER + ':' + PORT_SERVER + '/'.

- Almost all number are exprimed as String.


INDEX:
======
- [COMMENT RELATED](#COMMENT-RELATED)
- [CONVERSATION RELATED](#CONVERSATION-RELATED)
- [COURSE RELATED](#COURSE-RELATED)
- [LOCATION RELATED](#LOCATION-RELATED)
- [MESSAGE RELATED](#MESSAGE-RELATED)
- [TAGS RELATED](#TAGS-RELATED)
- [USER RELATED](#USER-RELATED)



COMMENT RELATED:
================

**SCHEMA:**

- message ```String```
- author ```userID```
- user_score ```[userID]```
- creation_date ```Date```
- comment_previous ```commentID```
- comment_next ```commentID```

<br>

**REQUESTS:**

- POST new comment: ```POST /comment/new_comment```

| Description | Headers | Body | Return |
|-|-|-|-|
| Create a new comment in a location or a course with a score.| access_token: String<br>location_id: LocationID<br>or<br>course_id: CourseID | message: String<br>score: String | |


- POST edit comment: ```POST /comment/edit_comment```

| Description | Headers | Body | Return |
|-|-|-|-|
| Edit a comment's message.| access_token: String<br>comment_id: CommentID | message: String | |


- GET get comment: ```GET /comment/get_comment```

| Description | Headers | Body | Return |
|-|-|-|-|
| Get comment's data in the given list.| access_token: String<br>comment_id: [CommentID] | | [CommentObject] (see Schema) |


CONVERSATION RELATED:
=====================

**SCHEMA:**

- participants ```[userID]```
- name ```String```
- messages_list ```[messageID]```
- recent_messages ```[{messageObject}]``` (See [MESSAGE RELATED](#MESSAGE-RELATED))

<br>

**REQUESTS:**

- GET conversations: ```GET /conversation/get_conversations```

| Description | Headers | Body | Return |
|-|-|-|-|
| Get all the conversations where the user appears.| access_token: String | | [conversationObject] (See Schema) |



COURSE RELATED:
===============

**SCHEMA:**

- locations_list ```[locationID]```
- name ```String```
- score ```String```
- user_score ```[UserID]```
- number_used ```String``` : number of usage of the course
- author ```UserID```
- creation_date ```Date```
- timetable ```String```
- comments_list ```[commentID]```
- tags_list ```[tagID]```

<br>

**REQUESTS:**

- ADD new course: ```POST /course/new_course```

| Description | Headers | Body | Return |
|-|-|-|-|
| Add a course to the database. | access_token: String | locations_list: [LocationID]<br>name: String<br>author: UserID (optional) | |


- GET course: ```GET /course/get_course```

| Description | Headers | Body | Return |
|-|-|-|-|
| Get a list of courses. Can be sorted by (name | number_used | score) | access_token: String<br>sort: String | | [LocationObject] (See Schema) |


LOCATION RELATED:
=================

**SCHEMA:**

- name ```String```
- owner ```String```
- score ```String```
- user_score ```[userID]```
- coordinate ```[Float, Float]```
- address ```String```
- city ```String```
- country ```String```
- description ```String```
- photo ```[String]```
- timetable ```String```
- comments_list ```[commentID]```
- tags_list ```[tagID]```
- price_range ```[String, String]```
- average_time ```String```
- phone ```String```
- website ```String```
- pop_disp ```String```
- pop_ag ```String```
- alg_disp ```String```
- alg_disp ```String```

<br>

**REQUESTS:**

- ADD new location: ```POST /location/new_location```

| Description | Headers | Body | Return |
|-|-|-|-|
| Add a location to the database. | access_token: String | name: String<br>owner: userID (Optional)<br>coordinate: [String, String]<br>address: String<br>city: String<br>country: String<br>description: String (optional)<br>timetable: String (optional)<br>tags_list: [tagID] (optional)<br>price_range: [String, String] (optional)<br>average_time: String (optional)<br>phone: String<br>website: String | |


- UPDATE a location: ```POST /location/update_location```

| Description | Headers | Body | Return |
|-|-|-|-|
| Update a location's data (at least one parameter in body). | access_token: String<br>location_id = locationID | name: String (optional)<br>owner: userID (optional)<br>coordinate: [String, String] (optional)<br>address: String (optional)<br>city: String (optional)<br>country: String (optional)<br>description: String (optional)<br>timetable: String (optional)<br>tags_list: [tagID] (optional)<br>price_range: [String, String] (optional)<br>average_time: String (optional) | |


- GET place: ```GET /location/get_place```

| Description | Headers | Body | Return |
|-|-|-|-|
| Get a place from Google Place API. | access_token: String<br>place_name: String | | result: place Object from Google Place API |


- GET location: ```GET /location/get_locations```

| Description | Headers | Body | Return |
|-|-|-|-|
| Get a list of locations. | access_token: String | | [LocationObject] |


- DEL location: ```DEL /location/remove_location```



MESSAGE RELATED:
================

**SCHEMA:**

- expeditor ```userID```
- conversation ```conversationID```
- creation_date ```Date```
- type ```String``` : "message" or "image" or "video"
- message ```String```

<br>

**REQUESTS:**

- GET messages: ```GET /message/get_messages```

| Description | Headers | Body | Return |
|-|-|-|-|
| Get the data of messages provided in an array of message's ID.| access_token: String | messages_list: [messageID] | [messageObject] (See Schema) |



TAGS RELATED:
=============

**SCHEMA:**

- name ```String```
- description ```String```
- number_used ```String```
- locations_list ```[locationID]```
- courses_list ```[courseID]```

<br>

**REQUESTS:**

- POST new tag: ```POST /tags/new_tag```

| Description | Headers | Body | Return |
|-|-|-|-|
| Create a new tag.| access_token: String | name: String<br>description: String (Optional) | None |

- GET tag: ```POST /tags/get_tags```

- DEL tag: ```DEL /tags/delete_tag```


USER RELATED:
=============

**SCHEMA:**

- mail ```String```
- password ```String```
- creation_date ```Date```
- pseudo ```String```
- type ```String``` : "particular" or "partner"
- first_name ```String```
- last_name ```String```
- access_token ```String```
- tags_list ```[tagID]```
- friends_list ```[userID]```
- friends_request ```[userID]```
- groups ```[[group_name, userID, ...]]```
- course_historic ```[courseID]```
- score_course ```[{courseID, String, Date}]``` : score as String
- score_location ```[{locationID, String, Date}]``` : score as String
- score_comment ```[{commentID, String, Date}]``` : score as String
- socket_id ```String```
- facebook_id ```String```

<br>

**REQUESTS:**

- ADD new user for registration: ```POST /users/register```

| Description | Headers | Body | Return |
|-|-|-|-|
| Register a new user for database.<br>For non-professional user.<br>Return a access token. | None | mail: String<br>password: String<br>pseudo: String <br>(optional) | access_token: String |


- ADD a request friend: ```POST /users/add_friend_request```

| Description | Headers | Body | Return |
|-|-|-|-|
| Send friend request to an user. | access_token: String | friend: userID | None |


- ADD a friend: ```POST /users/add_friend```

| Description | Headers | Body | Return |
|-|-|-|-|
| For friend request acception. | access_token: String | friend: userID | None |


- ADD new tags in user's tags: ```POST /users/add_tag```

| Description | Headers | Body | Return |
|-|-|-|-|
| Add existing tag in user's list. | access_token: String | tags_list: [tagID] | None |


- ADD a course in the user's historic: ```POST /users/add_historic```

| Description | Headers | Body | Return |
|-|-|-|-|
| Add existing course in user's historic list with the current date. | access_token: String | course: courseID | None |


- GET log in: ```GET /users/login```

| Description | Headers | Body | Return |
|-|-|-|-|
| Log in an user to get a valid token | mail: String<br>password: String | None | access_token: String |


- GET log out: ```GET /users/logout```

| Description | Headers | Body | Return |
|-|-|-|-|
| Log out an user.<br>Make unavailable the current token.| access_token: String | None | None |


- GET user's profile: ```GET /users/get_own_profile```

| Description | Headers | Body | Return |
|-|-|-|-|
| Get the current user's profile.| access_token: String | None | profile: {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mail: String,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;creation_date: Date,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pseudo: String,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type: String<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;first_name: String,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;last_name: String,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tags_list: [tagID],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;friends_list: [userID],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;friends_request: [userID],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;groups: [[group_name, userID1, userID2, ...]],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;course_historic: [courseID],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;score_course: [{courseID, score, Date}],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;score_location: [{locationID, score, Date}],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;score_comment: [{commentID, score, Date}]<br>} |


- GET an user's profile: ```GET /users/get_user_profile```

| Description | Headers | Body | Return |
|-|-|-|-|
| Get an user's profile by its ID.| access_token: String<br>user_id: String | None | profile: {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mail: String,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;creation_date: Date,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pseudo: String,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type: String<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;first_name: String,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;last_name: String,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tags_list: [tagID],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;friends_list: [userID] |


- GET an user's tags: ```GET /users/get_users_tags```

| Description | Headers | Body | Return |
|-|-|-|-|
| Get tags of users provided in array of userID.| access_token: String<br>user_id: String | None | all_user_tags: [TagObject] (See [TAG RELATED](#TAG-RELATED)) |


- DEL user's account: ```DEL /users/remove_account```

| Description | Headers | Body | Return |
|-|-|-|-|
| Delete an user's account.| access_token: String<br>password: String | None | None |

- DEL user's friend: ```DEL /users/remove_friend```

- DEL user's tags: ```DEL /users/remove_tags```
