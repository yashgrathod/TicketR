import axios from 'axios';

// Vite uses import.meta.env to read environment variables.
// If it finds Vercel's cloud URL, it uses it. If not, it defaults to your local machine.
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_URL = `${BASE_URL}/tickets`;

export const getTickets = async (search = '', status = '', email = '') => {
  const params = {};
  if (search) params.search = search;
  if (status && status !== 'All') params.status = status;
  if (email) params.email = email;

  const response = await axios.get(API_URL, { params });
  return response.data;
};

export const getTicketById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createTicket = async (ticketData) => {
  const response = await axios.post(API_URL, ticketData);
  return response.data;
};

export const updateTicket = async (id, updateData) => {
  const response = await axios.put(`${API_URL}/${id}`, updateData);
  return response.data;
};