import axios from 'axios';

const API_URL = '/api'; // This will use the proxy configured in vite.config.ts

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Dog APIs
export const createDog = (dogData: any) => api.post('/dogs', dogData);
export const getDog = (id: string) => api.get(`/dogs/${id}`);
export const updateDog = (id: string, dogData: any) => api.put(`/dogs/${id}`, dogData);

// Subscription APIs
export const createSubscription = (subscriptionData: any) => api.post('/subscriptions', subscriptionData);
export const getSubscription = (id: string) => api.get(`/subscriptions/${id}`);
export const updateSubscription = (id: string, subscriptionData: any) => api.put(`/subscriptions/${id}`, subscriptionData);
export const getDeliveries = (subscriptionId: string) => api.get(`/subscriptions/${subscriptionId}/deliveries`);

// User APIs
export const createUser = (userData: any) => api.post('/users', userData);
export const getUser = (id: string) => api.get(`/users/${id}`);
export const updateUser = (id: string, userData: any) => api.put(`/users/${id}`, userData);

// Payment API
export const processPayment = (paymentData: any) => api.post('/payments', paymentData);

export default api;