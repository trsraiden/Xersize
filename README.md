# Xersize

Web application for users to create and edit exercise routines and sessions.

Technology stack used:

* Front-End: React.js/JavaScript, CSS, HTML

* Back-End: Express/Node.js, Mongoose/MongoDB

* Authentication: Google Firebase

* PaaS Provider: Heroku

## Back-End - server.js

### Back-End packages:
* CORS
* Dotenv
* Express
* Mongoose

### Database Schemas

#### Routine.Model.js

| Property | Purpose |
| - | - |
| AuthorName |  User who owns the routine. |
| RoutineName | Name user has given the routine. |
| RoutineTemplate | The routine details – exercise, set, reps, rest times. |
| RoutineNotes | Notes given for the overall routine. |

#### Session.Model.js

| Property | Purpose |
| - | - |
| RoutineName | Routine the session originally came from. |
| Username | The user who submitted the session. |
| RoutineID | Routine the session originally came from. |
| SessionDetails | The session details – actual reps, sets, notes. |
| SessionNotes | Notes from a session. |
| SessionDate | Full date the session was submitted on. |
| WeekDay | The day of the week the session was submitted on. |
| Month | The month the session was completed on. |
| Day | The day of the month the session was completed on. |

### Routes

#### Routines.js
Back-end routes used for performing operations involving workout routines.

| Route | HTTP Method | CRUD Operation | Inputs | Use |
| - | - | - | - | - | 
| createRoutine | post | Create | authorName, routineName, routineTemplate, routineNotes | Create routine from Routine-Manager.component.js. |  
| createRoutineCopy/:newAuthor | post | Create | authorName, routineName, routineTemplate, routineNotes, :newAuthor | Create routine from Routine-Manager.component.js. | 
| /findRoutineByAuthor/:authorName | get | Read | :authorName | Return user routines for Routine-Dashboard.component.js. | 
| /findRoutineByOtherAuthor/:username | get | Read | :userName | Return all other users’ routines for Routine-Dashboard.component.js. | 
| /findByRoutineID/:routineID | get | Read | :routineID | Return routine information in the Routine-Manager.component.js to make edits to the routine. | 
| /findByRoutineIDForSession/:routineID | get | Read | :routineID | Return routine template in the Session-Manager.component.js to create a session. | 
| /updateRoutine/:routineID | post | Update | :routineID, routineName, routineTemplate, routineNotes | Update the routine based on changes submitted through the Routine-Manager.component.js. | 
| /deleteRoutine/:idRoutine | delete | Delete | :routineID | Delete a user’s routine specified in the Routine-Dashboard.component.js. | 

#### Sessions.js
Back-end routes used for performing operations involving workout sessions.

| Route | HTTP Method | CRUD Operation | Inputs | Use |
| - | - | - | - | - | 
|/createSession | post | Create | routineName, username, routineID, sessionDetails, sessionNotes, sessionDate, weekDay, month, day | Create session from Session-Manager.component.js. |
| /findBySessionID/:sessionID  | get | Read	| :sessionID | Return session information in the Session-Manager.component.js to make edits to the session. |
| /findSessionsByDate | post | Read | username, earlierDate, laterDate, volumeChartData, weightChartData, exersizeList	| Return session information for a range of dates for the Session-Dashboard.component.js for user to review. |
| /updateSession | post | Update | sessionID, sessionDetails, sessionNotes | Update the session based on changes submitted through the Session-Manager.component.js. |
| /deleteSession/:idSession | delete | Delete | :idSession | Delete a user’s session specified in the Session-Dashboard.component.js. |

#### Users.js
Back-end routes used for performing operations involving users. The user section is limited due to teh use of Google Firebase which handles authentication, storage, updates, etc.

| Route | HTTP Method | CRUD Operation | Inputs | Use |
| - | - | - | - | - | 
| /deleteUser |	delete | Delete | username	| Delete routines and sessions for the user deleting their account from DeleteAccount.js.|

## Front-End xersize-client

### Front-End packages:
* Axios

* Bootstrap/React-Bootstrap

* Chart.js/React-Chartjs-2

* Firebase

* React, React-DOM, React-Router-DOM

### Components:
Type of Component: Functional or Classful.

User State: Authenticated or Any.

Navigation: Its location relative to the login (“/”) location.

Purpose: Use within the app.

| Component | Component Type | User State | Navigation | Purpose |
| - | - | - | - | - |
| ChangePassword.js | Functional | Authenticated | Login => Home => Manage Account => Change Password | Use Firebase API to allow the active user to change their password if their session has not expired. |
| DeleteAccount.js | Functional | Authenticated |  Login => Home => Manage Account => Delete Account | Use Firebase functions to allow the active user to delete their account. The sessions and routines of the active user are deleted first using axios to communicate to the Node.js server to delete all sessions and routines in Xersize database (mongoDB). | 
| Footer.js | Functional | Authenticated/Any | The bottom section of each page – starting from the final red horizontal line. | Copyright at the bottom of each section. | 
| ForgotPassword.js | Functional | Any | Login => Forgot Password | Use Firebase functions to allow an existing user to have an email sent to them that will allow them to change their current password.
| Home.js | Functional | Authenticated | Login => Home | The landing page after the user after they authenticate and log in. Provides an overview of the session, routine, and manage sections. | 
| Login.js | Functional | Any | Login | The landing page for the application. Provides users with an option to login to an existing account, log in using an existing google account, signing up for an account, or resetting a forgotten password. |
| ManageAccount.js | Functional | Authenticated | Login => Home => Manage Account => Delete Account | Provide authenticated users with options to change their password or delete their account. | 
| Navbar.js | Functional | Authenticated | Login => *Every page for an authenticated user | Used by authenticated users to navigate the application. The sections that are available are: Xersize =>  to Home.js, Sessions => to Session-Dashboard.component.js, Routines => to Routine-Dashboard.component.js, Manage => to ManageAccount.js, Logout => End current user session using firebase and return to Login.js |
| PrivateRoute.js | Functional | Authenticated | Login => Home => Manage Account => Change Password | Allows only authenticated users to access user areas, provide the navigation bar, and return unauthenticated users to the Login.js page. |
| Routine-Dashboard.component.js | Classful | Authenticated | Login => Home => Routines | Consists of two main sections: authenticated and community workout routines. The authenticated user can create new routines (Routine-Manager.component.js), edit their existing routines (Routine-Manager.component.js), or delete their own routines (axios request to server). They are also able to start a session which will take them to Session-Manager.component.js and pass the routine ID using the local storage to set the template for the session. |
| Routine-Manager.component.js | Classful | Authenticated | Login => Home => Routines => Edit or Create Routine | Allow authenticated user to edit or create a new routine – edits/new routines are submitted using an axios communication with the Node.js server. |
| Session-Dashboard.component.js | Classful | Authenticated | Login => Home => Sessions | This dashboard has 2 sections. By default, information for the user’s sessions are provided for the past 7 days. The search area allows the user to search over a different range. The two sections are the sessions and the visualization of the user’s weight and volume for a given exercise. From the user’s sessions, the user can edit or delete sessions. TO edit the session, the user is directed to the Session-Manager.component.js with the session ID. |
| Session-Manager.component.js | Classful | Authenticated | Route 1. Login => Home => Routines => Start Session, Route 2. Login => Home => Sessions => Edit Session | Provides the user with access to recording a new session - when coming from the Routine-Dashboard.js – or to edit an existing session – when coming from the Session-Dashboard.js. Edits and new sessions are communicated using axios with the Node.js server to save the information to the database. | 
| Signup.js | Functional | Any | Login => Signup | Allows a user to create a new account using Firebase functions. |
