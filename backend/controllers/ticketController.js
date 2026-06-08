const Ticket = require('../models/Ticket');

// Generate unique ticket ID like TKT-001
const generateTicketId = async () => {
  const count = await Ticket.countDocuments();
  const nextId = (count + 1).toString().padStart(3, '0');
  return `TKT-${nextId}`;
};

// @desc    Create new ticket
// @route   POST /api/tickets
exports.createTicket = async (req, res) => {
  try {
    const { customer_name, customer_email, subject, description, priority, category } = req.body;
    
    const ticket_id = await generateTicketId();
    
    const ticket = await Ticket.create({
      ticket_id,
      customer_name,
      customer_email,
      subject,
      description,
      priority: priority || 'Medium',
      category: category || 'General'
    });
    
    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all tickets
// @route   GET /api/tickets
exports.getTickets = async (req, res) => {
  try {
    const { search, status, email } = req.query;
    
    let query = {};
    
    if (status && status !== 'All') {
      query.status = status;
    }
    
    if (email) {
      query.customer_email = email;
    }
    
    if (search) {
      query.$or = [
        { ticket_id: { $regex: search, $options: 'i' } },
        { customer_name: { $regex: search, $options: 'i' } },
        { customer_email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const tickets = await Ticket.find(query).sort({ createdAt: -1 });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get single ticket
// @route   GET /api/tickets/:id
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      $or: [
        { _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null },
        { ticket_id: req.params.id }
      ]
    });
    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    
    res.status(200).json(ticket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update ticket status, priority, category, or add note
// @route   PUT /api/tickets/:id
exports.updateTicket = async (req, res) => {
  try {
    const { status, priority, category, note_text, senderRole } = req.body;
    
    const ticket = await Ticket.findOne({
      $or: [
        { _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null },
        { ticket_id: req.params.id }
      ]
    });
    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    
    if (status) ticket.status = status;
    if (priority) ticket.priority = priority;
    if (category) ticket.category = category;
    
    if (note_text) {
      ticket.notes.push({ note_text, senderRole: senderRole || 'Agent' });
    }
    
    await ticket.save();
    
    res.status(200).json(ticket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
