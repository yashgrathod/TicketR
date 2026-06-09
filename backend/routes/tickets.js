const express = require('express');
const router = express.Router();
const {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket
} = require('../controllers/ticketController');
router.route('/')
  .get(getTickets)
  .post(createTicket);
router.route('/:id')
  .get(getTicketById)
  .put(updateTicket);
module.exports = router;
