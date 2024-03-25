// Calendar.tsx
import React, { useState } from 'react';
import styles from './Calendar.module.css';

// Interfaces
interface TimeSlot {
    start: Date;
    end: Date;
    isBooked: boolean;
    bookedBy?: string;
}

// Types
type WeekDates = Date[];
type TimeSlots = TimeSlot[];

// Helper functions
const generateWeekDates = (startDate: Date): WeekDates => {
    const dates: WeekDates = [];
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        dates.push(currentDate);
    }
    return dates;
};

const generateTimeSlots = (startDate: Date): TimeSlots => {
    const slots: TimeSlots = [];
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            for (let day = 0; day < 7; day++) {
                const startTime = new Date(startDate);
                startTime.setDate(startDate.getDate() + day);
                startTime.setHours(hour, minute, 0, 0);
                const endTime = new Date(startTime);
                endTime.setMinutes(startTime.getMinutes() + 30);

                slots.push({
                    start: startTime,
                    end: endTime,
                    isBooked: false
                });
            }
        }
    }
    return slots;
};


const Calendar: React.FC = () => {
    const startDate: Date = new Date(); // Today's date
    startDate.setHours(0, 0, 0, 0); // Start of today
    const weekDates: WeekDates = generateWeekDates(startDate);
    const timeSlots: TimeSlots = generateTimeSlots(startDate);

    // Assume your existing setup for startDate, weekDates, and timeSlots
    const [hoveredTimeLabelIndex, setHoveredTimeLabelIndex] = useState<number | null>(null);

    // Get local time zone
    const getLocalTimeZone = () => {
        const offset = -startDate.getTimezoneOffset();
        const sign = offset >= 0 ? "+" : "-";
        const pad = (num: number) => num.toString().padStart(2, '0');
        const hours = pad(Math.floor(Math.abs(offset) / 60));
        const minutes = pad(Math.abs(offset) % 60);
        return `UTC${sign}${hours}:${minutes}`;
    };
    const localTimeZone = getLocalTimeZone();

    // Function to format date
    const formatDate = (date: Date): JSX.Element => {
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
        const dayOfMonth = date.getDate().toString().padStart(2, '0');
        return (
            <div>
                <div className={styles.dayOfWeek}>{dayOfWeek}</div>
                <div className={styles.dayOfMonth}>{dayOfMonth}</div>
            </div>
        ); // Format: "FRI" on top of "02"
    };

    const lastTimeLabelIndex = timeSlots.length - 7;

    return (
        <div className={styles.calendar}>
            <div className={styles.calendarHeader}>
                <div className={styles.timeZoneHeader}>{localTimeZone}</div>
                {weekDates.map((date, index) => (
                    <div key={index} className={styles.calendarDay}>
                        {formatDate(date)}
                    </div>
                ))}
            </div>
            <div className={styles.calendarBody}>
                {timeSlots.map((slot, slotIndex) => {
                    const isFirstSlotOfDay = slotIndex % 7 === 0;
                    const isLastTimeLabel = slotIndex === lastTimeLabelIndex; // Check if this is the last time label
                    const isHoveredRow = hoveredTimeLabelIndex !== null && Math.floor(hoveredTimeLabelIndex / 7) === Math.floor(slotIndex / 7);

                    return (
                        <React.Fragment key={slotIndex}>
                            {isFirstSlotOfDay && (
                                <div className={`${styles.timeLabel} ${isLastTimeLabel ? styles.lastTimeLabel : ''} ${isHoveredRow ? styles.hoveredTimeLabel : ''}`}
                                    onMouseEnter={() => setHoveredTimeLabelIndex(slotIndex)}
                                    onMouseLeave={() => setHoveredTimeLabelIndex(null)}
                                >
                                    {slot.end.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                                </div>
                            )}
                            <div className={`${styles.calendarSlot} ${isHoveredRow ? styles.hoveredTimeLabel : ''}`}>

                            </div>
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};


export default Calendar;
