import axios, { AxiosError, AxiosResponse } from 'axios';
import {type TimeSlot, type  WeekDates, type  TimeSlots, type  TutorRes} from '../utils/tpyes';
const USERAPIURL = 'api/auth'
const register = ( email : string, password : string, role : string)=>{

  return axios.post(`${USERAPIURL}/register`,  {
    email, password, role
})} //  const { email, password, role } = req.body;


const login = ( email : string, password : string,)=>{

  return axios.post(`${USERAPIURL}/login`,  {
    email, password
})}

const logout = ( email : string, password : string,)=>{

  return axios.post(`${USERAPIURL}/logout`,  {
    email, password
})}



export {register, login, logout}
