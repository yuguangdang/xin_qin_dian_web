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

interface tutorRes {
  data: {
    _id: string;
    email: string;
    name: string;
    password: string;
    reviews: string[];
    subjects: string[];
    availableSlots: TimeSlot[];
  };
}

export { type TimeSlot, type WeekDates, type TimeSlots, type tutorRes };
