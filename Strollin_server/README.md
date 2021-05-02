# STROLLIN REST API SERVER 

NOTE:

- The list is separated in Object Related.

- Each object will presents the schema and the available requests.

- Where full URLs are provided in responses they will be rendered as if service is running on 'http://' + IP_SERVER + ':' + PORT_SERVER + '/'.

- All request will return an object as :<br>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;status: String<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;eventual return: Object<br>}

- All documents in the database has a variable "id" (Some Exceptions). Do not use "_id" given by MongoDB.

- The document show some type as "ObjectID" which represent the "id" of a model. (Example: `UserID` represent user.id)

- In case of error during a request with the database transaction, the returned object will always contains a "status" and a "error" variable.


INDEX:
======
- [BLACKLIST RELATED](#BLACKLIST-RELATED)
- [COMMENT RELATED](#COMMENT-RELATED)
- [CONVERSATION RELATED](#CONVERSATION-RELATED)
- [COURSE RELATED](#COURSE-RELATED)
- [FAQ RELATED](#FAQ-RELATED)
- [IMAGE RELATED](#IMAGE-RELATED)
- [LOCATION RELATED](#LOCATION-RELATED)
- [MESSAGE RELATED](#MESSAGE-RELATED)
- [TAGS RELATED](#TAGS-RELATED)
- [USER RELATED](#USER-RELATED)
- [GENERATOR RELATED](#GENERATOR-RELATED)

<br>

BLACKLIST RELATED:
================

**DESCRIPTION**

Blacklist is used to save the IP of the user and lock the attempt to connect if the user send wrong authentication.

**SCHEMA:**

- ip `String`
- attempt `Number`
- lock_date `Number`

<br>

**REQUESTS:**

No request.

<br>

COMMENT RELATED:
================

**DESCRIPTION**

The object Comment represents the comments and rates left by an user to a location or a course.

**SCHEMA:**

- id `Number`
- message `String`
- author_id `UserID`
- author_pseudo `String`
- score `String`
- creation_date `String`
- modification_date `Number`

<br>

**REQUESTS:**

- POST new comment: `POST /comment/new_comment`

| Description | Headers | Body | Return |
|-|-|-|-|
| Create a new comment in a location or a course with a score. If the user commented before, the comment will be updated | access_token: String<br>location_id: LocationID<br>or<br>course_id: CourseID | message: String<br>score: String | |


- GET get comment by ID: `GET /comment/get_comment_by_id`

| Description | Headers | Body | Return |
|-|-|-|-|
| Get comment's data by ID or list of ID.| access_token: String<br>comments_list: [CommentID] | | comments_list[CommentObject] (see Schema) |

<br>

CONVERSATION RELATED:
=====================

**DESCRIPTION**

The object Conversation represents the chat room for the user. It contains a list of Message Object.

**SCHEMA:**

- id `Number`
- participants `[userID]`
- name `String`
- messages_list `[messageID]`
- recent_messages `[{messageObject}]` (See [MESSAGE RELATED](#MESSAGE-RELATED))

<br>

**REQUESTS:**

- GET conversations: `GET /conversation/get_conversations`

| Description | Headers | Body | Return |
|-|-|-|-|
| Get all the conversations where the user appears.| access_token: String | | conversations: [conversationObject] (See Schema) |


- GET get conversation by ID: `GET /conversation/get_conversation_by_id`

| Description | Headers | Body | Return |
|-|-|-|-|
| Get conversation's data by ID or list of ID. | access_token: String<br>conversations_list: [ConversationID] | | conversations_list: [ConversationObject] (see Schema) |

<br>

COURSE RELATED:
===============

**DESCRIPTION**

The object Course contains the informations of the course saved in database.

**SCHEMA:**

- id `Number`
- locations_list `[locationID]`
- name `String`
- score `String`
- number_used `String` : number of usage of the course
- author_id `UserID`
- author_pseudo `String`
- creation_date `String`
- timetable `String`
- price_range `[String, String, String]` : Min, Max, Avg
- comments_list `[commentID]`
- tags_list `[tagID]`
- time_spent: `[String]` (list of time spent to do the course)

<br>

**REQUESTS:**

- ADD new course: `POST /course/new_course`

| Description | Headers | Body | Return |
|-|-|-|-|
| Add a course to the database. | access_token: String | locations_list: [LocationID]<br>name: String | course: CourseObject (See Schema) |


- GET course: `GET /course/get_course`

| Description | Headers | Body | Return |
|-|-|-|-|
| Get a list of courses. Can be sorted by name, number_used, score, tendency (tendency_range is at 30 days by default) | access_token: String<br>sort: String<br>tendency_range: Number (Optional) | | courses_list: [CourseObject] (See Schema) |


- GET course: `GET /course/get_user_historic`

| Description | Headers | Body | Return |
|-|-|-|-|
| Get a list of course in the historic of the user. Size is the number of course to return max | access_token: String<br>size: Number (default: 10) | | course_historic: [CourseObject] (See Schema) |


- GET get course by ID: `GET /course/get_course_by_id`

| Description | Headers | Body | Return |
|-|-|-|-|
| Get course's data by ID or list of ID. | access_token: String<br>courses_id_list: [CourseID] | | courses_list: [CourseObject] (see Schema) |

<br>


FAQ RELATED:
===============

**DESCRIPTION**

The object Faq represents the question sent by users and non users about Strollin.

**SCHEMA:**

- id `Number`
- author `String`
- question `String`
- creation_date `String`
- answer `String`
- published `Boolean`
- language `String` : "fr" || "en"

<br>

**REQUESTS:**

- ADD Create a question: `POST /faq/create_question`

| Description | Headers | Body | Return |
|-|-|-|-|
| Create a new question. | | mail: String<br>question: String<br>language: String | |


- ADD answer to a question: `POST /faq/answer_question`

| Description | Headers | Body | Return |
|-|-|-|-|
| Add an answer to a question and set the published state. | question_id: QuestionID | answer: String<br>published: Boolean | |


- GET all "fr" questions: `GET /faq/get_question_fr`

| Description | Headers | Body | Return |
|-|-|-|-|
| Get questions in french section. | | | faqs_list: [questionObject] (see Schema) |


- GET all "en" questions: `GET /faq/get_question_en`

| Description | Headers | Body | Return |
|-|-|-|-|
| Get questions in english section. | | | faqs_list: [questionObject] (see Schema) |


- GET get question by ID: `GET /faq/get_question_by_id`

| Description | Headers | Body | Return |
|-|-|-|-|
| Get question's data by ID or list of ID. | faqs_list: [questionID] | | [questionObject] (see Schema) |

<br>


IMAGE RELATED:
===============

**DESCRIPTION**

The object Image represents the stored images in the server for the user's profile or the shared images in conversations.

**SCHEMA:**

- id `Number`
- author `String`
- uri `String`
- mimetype `String`

<br>

**REQUESTS:**

<br>


LOCATION RELATED:
=================

**DESCRIPTION**

The object Location represents the locations used in courses. It is also used for the partner user.

**SCHEMA:**

- id `Number`
- name `String`
- owner_id `UserID`
- owner_pseudo `String`
- score `String`
- latitude `String`
- longitude `String`
- address `String`
- city `String`
- country `String`
- description `String`
- photo `[String]`
- timetable `String`
- comments_list `[commentID]`
- tags_list `[{tag_id: tagID, disp: String}]`
- price_range `[String, String, String]` : Min, Max, Avg
- average_time `String`
- phone `String`
- website `String`
- pop_disp `String`
- pop_ag `String`
- alg_disp `String`
- alg_disp `String`
- food `Boolean`

<br>

**REQUESTS:**

- ADD new location: `POST /location/new_location`

| Description | Headers | Body | Return |
|-|-|-|-|
| Add a location to the database. | access_token: String | name: String<br>owner: userID (Optional)<br>latitude: Number<br>longitude: Number<br>address: String<br>city: String (optional)<br>country: String (optional)<br>description: String (optional)<br>price_range: [String, String, String] (optional)<br>timetable: String (optional)<br>tags_list: [tagID] (optional)<br>average_time: String (optional)<br>phone: String (optional)<br>website: String  (optional)<br>food: Boolean | |


- UPDATE a location: `POST /location/update_location`

| Description | Headers | Body | Return |
|-|-|-|-|
| Update a location's data (at least one parameter in body). | access_token: String<br>location_id: locationID | name: String (optional)<br>owner: userID (optional)<br>latitude: Number (optional)<br>longitude: Number (optional)<br>address: String (optional)<br>city: String (optional)<br>country: String (optional)<br>description: String (optional)<br>price_range: [String, String, String] (optional)<br>timetable: String (optional)<br>average_time: String (optional)<br>phone: String (optional)<br>website: String  (optional)<br>food: Boolean | |


- ADD tag(s) to a location: `POST /location/add_location_tag`

| Description | Headers | Body | Return |
|-|-|-|-|
| Update a location's tags. | access_token: String<br>location_id: locationID | tags_list: [TagName] | |


- GET place: `GET /location/get_place`

| Description | Headers | Body | Return |
|-|-|-|-|
| Get a place from Google Place API. | access_token: String<br>place_name: String | | result: place Object from Google Place API |


- GET location: `GET /location/get_locations`

| Description | Headers | Body | Return |
|-|-|-|-|
| Get a list of all locations. | access_token: String | | locations_list: [LocationObject] |


- GET location: `GET /location/get_partner_location`

| Description | Headers | Body | Return |
|-|-|-|-|
| Get the location of the partner. | access_token: String | | location: LocationObject |


- GET get location by ID: `GET /location/get_location_by_id`

| Description | Headers | Body | Return |
|-|-|-|-|
| Get location's data by ID or list of ID. | access_token: String<br>locations_id_list: [LocationID] | | locations_list: [LocationObject] (see Schema) |

<br>

MESSAGE RELATED:
================

**DESCRIPTION**

The object Message is the message sent in conversations. It can contains simple messages, images or courses.

**SCHEMA:**

- id `Number`
- expeditor_id `userID`
- expeditor_pseudo `String`
- conversation `conversationID`
- creation_date `String`
- type `String` : "message" || "image" || "course"
- message `String`

<br>

**REQUESTS:**

- GET messages: `GET /message/get_message`

| Description | Headers | Body | Return |
|-|-|-|-|
| Get the data of messages provided in an array of message's ID.| access_token: String<br>messages_id: messageID | | message: [messageObject] (See Schema) |


- GET get message by ID: `GET /message/get_message_by_id`

| Description | Headers | Body | Return |
|-|-|-|-|
| Get message's data by ID or list of ID. | access_token: String<br>message_id: [MessageID] | | messages_list: [MessageObject] (see Schema) |



TAGS RELATED:
=============

**DESCRIPTION**

The object Tag is used for users, locations and courses.

**SCHEMA:**

- id `Number`
- name `String`
- description `String`
- number_used `String`
- locations_list `[locationID]`
- courses_list `[courseID]`

<br>

**REQUESTS:**

- POST new tag: `POST /tags/new_tag`

| Description | Headers | Body | Return |
|-|-|-|-|
| Create a new tag.| access_token: String | name: String<br>description: String (Optional) | None |


- GET tag: `POST /tags/get_tag`

| Description | Headers | Body | Return |
|-|-|-|-|
| Get a list of tag with sort (name, number_used) and filter with name search.| access_token: String<br>sort: String (optional)<br>search: String (optional) || tags: [tagObject] (See Schema) |


- GET get tag by ID: `GET /tag/get_tag_by_id`

| Description | Headers | Body | Return |
|-|-|-|-|
| Get tag's data by ID or list of ID. | access_token: String<br>tags_list: [TagID] | | tags_list: [TagObject] (see Schema) |


USER RELATED:
=============

**DESCRIPTION**

The object User represents the users of the application Strollin and the partner.

**SCHEMA:**

- id `Number`
- mail `String`
- password `String`
- creation_date `String`
- pseudo `String`
- partner `Boolean`
- first_name `String`
- last_name `String`
- access_token `String`
- tags_list `[tagID]`
- friends_list `[userID]`
- friends_request `[userID]`
- groups `[[group_name, userID, ...]]`
- course_historic `[[courseID, String]]` : ID and date
- socket_id `String`
- facebook_id `String`
- verify `Boolean`

<br>

**REQUESTS:**

- ADD new user for registration: `POST /users/register`

| Description | Headers | Body | Return |
|-|-|-|-|
| Register a new user for database.<br>partner = false for normal user.<br>Return a access token.<br>The app will send a mail to check the validity. | None | mail: String<br>password: String<br>partner: Boolean<br>pseudo: String (optional)<br>first_name: String (optional)<br>last_name: String (optional) | access_token: String |


- VERIFY the user's mail: `GET /users/verify`

| Description | Headers | Body | Return |
|-|-|-|-|
| Check and set to true the variable "verify". | id: String | | None |


- UPDATE user's information: `POST /users/edit_profile`

| Description | Headers | Body | Return |
|-|-|-|-|
| Edit user's information. | access_token: String | password: String (optional)<br>pseudo: String (optional)<br>first_name: String (optional)<br>last_name: String (optional) | |


- ADD a request friend: `POST /users/add_friend_request`

| Description | Headers | Body | Return |
|-|-|-|-|
| Send friend request to an user. | access_token: String | friend: userID | None |


- ADD a friend: `POST /users/add_friend`

| Description | Headers | Body | Return |
|-|-|-|-|
| Add to "friends_list" a user from the "friends_request". | access_token: String | friend: userID | None |


- ADD new tags in user's tags: `POST /users/add_tag`

| Description | Headers | Body | Return |
|-|-|-|-|
| Add existing tag in user's list. | access_token: String | tags_list: [tagID] | None |


- ADD a course in the user's historic: `POST /users/add_historic`

| Description | Headers | Body | Return |
|-|-|-|-|
| Add existing course in user's historic list with the current date. | access_token: String | course: courseID | None |


- GET log in: `GET /users/login`

| Description | Headers | Body | Return |
|-|-|-|-|
| Log in an user to get a valid token. | mail: String<br>password: String | None | access_token: String |


- GET log out: `GET /users/logout`

| Description | Headers | Body | Return |
|-|-|-|-|
| Log out an user.<br>Make unavailable the current token.| access_token: String | None | None |


- GET user's profile: `GET /users/get_own_profile`

| Description | Headers | Body | Return |
|-|-|-|-|
| Get the current user's profile.| access_token: String | None | profile: {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id: UserID,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mail: String,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;creation_date: Date,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pseudo: String,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;partner: Boolean<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;first_name: String,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;last_name: String,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tags_list: [tagID],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;friends_list: [userID],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;friends_request: [userID],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;groups: [[group_name, userID1, userID2, ...]],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;course_historic: [courseID]<br>} |


- GET an user's profile: `GET /users/get_user_profile`

| Description | Headers | Body | Return |
|-|-|-|-|
| Get an user's profile by its ID.| access_token: String<br>user_id: String | None | profile: {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id: UserID,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mail: String,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;creation_date: Date,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pseudo: String,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;partner: Boolean<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;first_name: String,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;last_name: String,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tags_list: [tagID],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;friends_list: [userID]<br>} |


- GET an user's tags: `GET /users/get_user_tags`

| Description | Headers | Body | Return |
|-|-|-|-|
| Get tags of users provided in array of userID.| access_token: String<br>user_id: String | None | all_user_tags: [TagObject] (See [TAG RELATED](#TAG-RELATED)) |


- GET get user by ID: `GET /user/get_user_by_id`

| Description | Headers | Body | Return |
|-|-|-|-|
| Get user's data by ID or list of ID. | access_token: String<br>user_id: [UserID] | | users_list: [UserObject] (see Schema) |


- DEL user's account: `DEL /users/remove_account`

| Description | Headers | Body | Return |
|-|-|-|-|
| Delete an user's account.| access_token: String<br>password: String | None | None |

- DEL user's friend: `DEL /users/remove_friend`

- DEL user's tags: `DEL /users/remove_tags`



GENERATOR RELATED:
==================

