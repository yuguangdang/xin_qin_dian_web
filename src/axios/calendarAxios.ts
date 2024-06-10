import axios, { AxiosError, AxiosResponse } from 'axios';
import {type TimeSlot, type  WeekDates, type  TimeSlots, type  TutorRes, type TutorsRes} from '../utils/tpyes';
interface Tutor {
  name?: string;
  subjects?: string[];
  availableSlots?: TimeSlot[];
  reviews?: {
    studentId: string;
    review: string;
    rating: number;
    timestamp: Date;
  }[];
}

axios.defaults.baseURL = 'http://localhost:3001';

const setBooking = (id: string)=>{}
const cancelBooking = ()=>{}

const TUTORAPIURL = '/api/tutors'
const BOOKINGAPIURL = '/api/booking'


const getTutorById = (id: string): Promise<TutorRes>=>{
  return axios.get(`${TUTORAPIURL}/getTutorById/${id}`)
}


const getAllTutors = (): Promise<TutorsRes>=>{
  return axios.get(`${TUTORAPIURL}/getAllTutors/`)
}
const bookSession = ( studentId:string, tutorId:string, slots:TimeSlot[])=>{
  return axios.post(`${BOOKINGAPIURL}/book/`,{ studentId, tutorId, slots })
}
const cancelSession = ( studentId:string, tutorId:string, slots:TimeSlot[])=>{
  return axios.post(`${BOOKINGAPIURL}/cancel/`,{ studentId, tutorId, slots })
}
const updateTutorById = (id: string, tutorInfo:Tutor): Promise<TutorsRes>=>{
  return axios.put(`${TUTORAPIURL}/updateTutor/${id}`,{
    ...tutorInfo
  })
}


export {setBooking, cancelBooking, getAllTutors, getTutorById, updateTutorById, bookSession, cancelSession}
