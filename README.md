1.	Create a web application
a.	Node JS as a backend
i.	npm Install for installation dependencies. 
b.	Angular 8 as a Frontend
i.	cd client/project1/
ii.	npm Install for installation dependencies. 
2.	Backend layers
a.	Application Layer – Exposing the routes
b.	Web Sockets Layer – Implementing the Socket Connection.
c.	DB Layer – Saving the data into DB.
3.	Frontend Layers
a.	Login page – Google login using OAuth2
b.	Post page – Where user can send a YOUTUBE Live Stream URL with comma separated Keyword and keyword send through separate text box. 
4.	Application Layer [Backend | Node JS]
a.	Youtube Link will be sent through POST method routes.
b.	We need to capture all the live comments from the youtube stream url.
5.	Web Socket layer
a.	Send Comments to the frontend through the web socket layer.
NOTE: User will be subscribed to the web socket service only upon sending a YouTube stream url.
6.	Data Base layer
a.	All the comments irrespective of keywords must be stored in the database in the comments  (table, document collection etc.)
b.	Another one will be session where users info is stored along with the stream url and the keywords.
c.	The comments should be tied using the unique session id.
7.	Keyword Requirement
a.	If the keywords are present, we need to check if multiple are provided or not.
b.	This case only those comments will be sent to front-end which have those keywords.
c.	Check this against multiple users by accessing the application using different tabs
8.	Auth Service
a.	The oauth service should be handled at the backend or frontend level.
b.	But the token verification should be done at the backend level
9.	Search Routes
a.	create a search route at app service
b.	If he wants to later search against a specific session for comments with different keywords.
c.	If a user has multiple session.
d.	All the session for a given google id will be shown at front-end and the searching for different keywords will be only performed against a particular session.

