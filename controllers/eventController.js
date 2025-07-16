const { Event, User, Registration } = require('../models');
const { Op } = require('sequelize');

// POST /api/events/
exports.createEvent = async (req, res) => {
  try {
    const { title, dateTime, location, capacity } = req.body;

    if (!title || !dateTime || !location || !capacity) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (capacity <= 0 || capacity > 1000) {
      return res.status(400).json({ message: 'Capacity must be between 1 and 1000.' });
    }

    const event = await Event.create({ title, dateTime, location, capacity });
    return res.status(201).json({ eventId: event.id });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET /api/events/:eventId
exports.getEventDetails = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.eventId, {
      include: {
        model: User,
        through: { attributes: [] },
      }
    });

    if (!event) return res.status(404).json({ message: 'Event not found' });

    return res.json(event);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// POST /api/events/:eventId/register
exports.registerUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const event = await Event.findByPk(req.params.eventId, {
      include: {
        model: User,
        through: { attributes: [] },
      }
    });
    const user = await User.findByPk(userId);

    if (!event || !user) {
      return res.status(404).json({ message: 'Event or User not found' });
    }

    const isPast = new Date(event.dateTime) < new Date();
    if (isPast) {
      return res.status(400).json({ message: 'Cannot register for a past event' });
    }

    const alreadyRegistered = await Registration.findOne({
      where: { EventId: event.id, UserId: user.id }
    });
    if (alreadyRegistered) {
      return res.status(409).json({ message: 'User already registered' });
    }

    if (event.Users.length >= event.capacity) {
      return res.status(400).json({ message: 'Event is full' });
    }

    await Registration.create({ EventId: event.id, UserId: user.id });
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DELETE /api/events/:eventId/cancel
exports.cancelRegistration = async (req, res) => {
  try {
    const { userId } = req.body;
    const eventId = req.params.eventId;

    const registration = await Registration.findOne({ where: { EventId: eventId, UserId: userId } });

    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    await registration.destroy();
    return res.status(200).json({ message: 'Registration cancelled successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET /api/events/
exports.listUpcomingEvents = async (req, res) => {
  try {
    const now = new Date();
    const events = await Event.findAll({
      where: {
        dateTime: { [Op.gt]: now }
      },
      order: [
        ['dateTime', 'ASC'],
        ['location', 'ASC']
      ]
    });
    return res.json(events);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET /api/events/:eventId/stats
exports.getEventStats = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.eventId, {
      include: {
        model: User,
        through: { attributes: [] },
      }
    });

    if (!event) return res.status(404).json({ message: 'Event not found' });

    const totalRegistrations = event.Users.length;
    const remainingCapacity = event.capacity - totalRegistrations;
    const percentUsed = ((totalRegistrations / event.capacity) * 100).toFixed(2);

    return res.json({
      totalRegistrations,
      remainingCapacity,
      percentageUsed: `${percentUsed}%`
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
