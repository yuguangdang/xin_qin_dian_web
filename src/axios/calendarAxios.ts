import axios, { AxiosError, AxiosResponse } from 'axios';
import {type TimeSlot, type  WeekDates, type  TimeSlots, type  TutorRes, type TutorsRes} from '../utils/tpyes';

axios.defaults.baseURL = 'http://localhost:3001';

const setBooking = (id: string)=>{}
const cancelBooking = ()=>{}

const TUTORAPIURL = '/api/tutors'


const getTutorById = (id: string): Promise<TutorRes>=>{
  return axios.get(`${TUTORAPIURL}/getTutorById/${id}`)
}


const getAllTutors = (): Promise<TutorsRes>=>{
  return axios.get(`${TUTORAPIURL}/getAllTutors/`)
}

export {setBooking, cancelBooking, getAllTutors, getTutorById}
