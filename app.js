const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

// Serives
const IdeaService = require('./services/idea.services');

const app = express(feathers());

// Parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure Socket.io for realtime APIs
app.configure(socketio());
// Enable REST services
app.configure(express.rest());

// Register a service
app.use('/ideas', new IdeaService());

// New connections connect to stream channel
app.on('connection', (conn) => app.channel('stream').join());

// Publish all events to the stream channel
app.publish((data) => app.channel('stream'));

const PORT = process.env.PORT || 3030;
app
  .listen(PORT, () => console.log(`REST API server ready on port:${PORT}`))
  .on('listening', () => console.log(`RealTime server running on port:${PORT}`));

// USING A SERVICE: just for educational purpose
/* 
    app.service('ideas').create({
    text: 'Rocket Chat App',
    tech: 'Meteor JS',
    viewer: 'Party People'
    }); 

*/
