# Rep-Chat
This is my version of a rep chat application that uses React.js front-end
with a Rails backend. I use websockets over Redis to deliver chat messages.

## How to run
Make sure you have Ruby, Rails, Postgresql, and Redis installed. On the
terminal, start the Rails server:
```
rails s
```
Then on another terminal, start the Redis server:
```
redis-server
```
Now you can navigate to http://localhost:3000/ in your browser to see the app.


## Web UI Requirements

- [x] Connect and set display name

	· The web client should connect to the server via a websocket.
	· A connected client should be able to pick a display name.

- [x] Display a list of all chat rooms

	· Fetch a list of chat rooms from the server, and display them.
	· Display the most recently received message for each room.
	· Also show the unread message count for each room.

- [x] Ability to send and receive messages

	· Some sort of input box that allows the user to compose and send messages.
	· All the messages for a room should display in realtime.

- [x] Emoticon panel with "hover magnification" effect - I used a css transition for this.

	· Allow for the rep to show a panel of emoticons - when clicked the emoticon should be inserted into the text input.
	· When hovering the mouse over an emoticon, display a "hover element" on top (in the z direction) with a magnified emoticon.
	· Make the hover element big enough that it slightly overlaps the neighboring emoticons.


## Server Requirements

- [x] Accept connections and display name

	· A client should be able to connect and set its display name

- [x] Serve up list of chat rooms

	· When requested, send a list of all chat rooms.
	· This list can be hard coded, just make it more then ~3.

- [x] Ability to receive and dispatch messages

	· When a connected client sends a message, it should be delivered to all connected clients in real time.
	· Note that all messages should be delivered to all clients - there is no need for a notion of "room membership".
	· Also note that you don't need to support full chat room history - clients only need to be notified of messages in real time as they happen.
