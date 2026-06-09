const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
  note_text: {
    type: String,
    required: true
  },
  senderRole: {
    type: String,
    enum: ['Customer', 'Agent'],
    required: true,
    default: 'Agent'
  }
}, { timestamps: true });
const ticketSchema = new mongoose.Schema({
  ticket_id: {
    type: String,
    required: true,
    unique: true
  },
  customer_name: {
    type: String,
    required: true
  },
  customer_email: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Closed'],
    default: 'Open'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  category: {
    type: String,
    enum: ['General', 'Technical', 'Billing', 'Account'],
    default: 'General'
  },
  attachments: [String],
  notes: [noteSchema]
}, { timestamps: true });
module.exports = mongoose.model('Ticket', ticketSchema);
