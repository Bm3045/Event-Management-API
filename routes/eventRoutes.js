const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Create a new event
router.post('/', eventController.createEvent);

// Get event details with registered users
router.get('/:eventId', eventController.getEventDetails);

// Register a user for an event
router.post('/:eventId/register', eventController.registerUser);

// Cancel a user’s registration
router.delete('/:eventId/cancel', eventController.cancelRegistration);

// List upcoming events with custom sorting
router.get('/', eventController.listUpcomingEvents);

// Get event statistics
router.get('/:eventId/stats', eventController.getEventStats);

module.exports = router;
