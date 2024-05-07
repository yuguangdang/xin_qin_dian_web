import { Interface } from "readline";

// Interfaces
interface TimeSlot {
  startTime: Date;
  endTime: Date;
  isBooked: boolean|null;
  bookedBy?: string;
}

// Types
type WeekDates = Date[];
interface TimeSlots {
  [day: string]: { [hour: string]: { [minute: string]: TimeSlot } };
}

interface ITutor {
  _id: string;
  name: string;
  subjects: string[];
  availableSlots: TimeSlot[];
  reviews: {
    studentId: string;
    review: string;
    rating: number;
    timestamp: Date;
  }[];
}

interface IUser {
  _id: string;
  email: string;
  password: string;
  role: 'student' | 'tutor';
  profileId?: string;
}

interface IStudent {
  _id: string;
  name: string;
  subjectsOfInterest: string[];
  bookedSessions: {
    tutorId: string
    slotId: string;
  }[];
}
interface TutorRes {
  data:ITutor
}
interface LoginRes {
  data:{
    user: IUser,
    token: string
  }
}
interface TutorsRes {
  data:ITutor[];
}

export { type TimeSlot, type WeekDates, type TimeSlots, type TutorRes, type TutorsRes, type ITutor, type LoginRes };
