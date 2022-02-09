import { AUTH_TOKEN_KEY } from '@constants/auth';
import axios from 'axios';

export default axios.create({
  baseURL: process.env.BACKEND_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`,
  },
});
