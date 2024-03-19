// utils/http.ts
import axios from 'axios';

// Set up a base URL for your API requests
let BACKEND_URL;
if (process.env.NODE_ENV === "development") {
    BACKEND_URL = "http://localhost:3001/api";
  } else if (process.env.NODE_ENV === "production") {
    BACKEND_URL = "to be added in the future";
  }
  

// Create an instance of axios with the API base URL
const api = axios.create({
  baseURL: BACKEND_URL,
});

// Function to get tutor availability
export const fetchTutorAvailability = async (tutorId: string) => {
  try {
    const response = await api.get(`/tutors/getTutorAvailabilityById/${tutorId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tutor availability:', error);
    throw error;
  }
};

