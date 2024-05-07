// Calendar.tsx
import React, { useEffect, useState } from "react";
import styles from "./Calendar.module.css";
import {
  setBooking,
  cancelBooking,
  getAllTutors,
  getTutorById,
} from "../../../axios/calendarAxios";

import {
  type TimeSlot,
  type WeekDates,
  type TimeSlots,
  type TutorRes,
} from "../../../utils/tpyes";
import { time } from "console";
import * as _ from "lodash";
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
//why we use dict: for better slot replacement
const generateTimeSlots = (startDate: Date): TimeSlots => {
  const slots: TimeSlots = {};
  for (let day = 0; day < 7; day++) {
    const timeVar = new Date(startDate);
    timeVar.setDate(startDate.getDate() + day);
    if (!slots[timeVar.getDate()]) {
      slots[timeVar.getDate()] = {};
    }
    for (let hour = 0; hour < 24; hour++) {
      timeVar.setHours(hour, 0, 0, 0);
      if (!slots[timeVar.getDate()][timeVar.getHours()]) {
        slots[timeVar.getDate()][timeVar.getHours()] = {};
      }
      for (let minute = 0; minute < 60; minute += 30) {
        timeVar.setMinutes(minute);
        const startTime = new Date(timeVar);

        const endTime = new Date(timeVar);
        endTime.setMinutes(minute + 30);

        slots[startTime.getDate()][startTime.getHours()][
          startTime.getMinutes()
        ] = {
          startTime: startTime,
          endTime: endTime,
          isBooked: null,
        };
      }
    }
  }
  console.log(slots);
  return slots;
};

//why do we do a function instead of return list in init: reuse after change
const toRenderList = (slots: TimeSlots): TimeSlot[] => {
  const slotsList: TimeSlot[] = [];
  for (let day in slots) {
    for (let hour in slots[day]) {
      for (let minute in slots[day][hour]) {
        slotsList.push(slots[day][hour][minute]);
      }
    }
  }
  const renderList = slotsList.slice(0, 48).concat(slotsList);
  console.log(renderList);
  return renderList;
};

const setAvailabilityWithSlots = (availability: TimeSlots): TimeSlots => {
  return availability;
};

const Calendar = (props: {TutorId:string}) => {
  const TutorId = props.TutorId
  const startDateInit = new Date();
  const [startDate, setStartDate] = useState<Date>(startDateInit); // Today's date
  const weekDates: WeekDates = generateWeekDates(startDate);
  const [renderSideBar, setRenderSideBar] = useState(false);
  const [slotSelected, setSlotSelected] = useState<TimeSlot|null>(null);

  const [timeSlots, setTimeSlots] = useState<TimeSlots>(
    generateTimeSlots(startDate)
  );
  // Assume your existing setup for startDate, weekDates, and timeSlots
  const [hoveredTimeLabelIndex, setHoveredTimeLabelIndex] = useState<
    number | null
  >(null);

  // Get local time zone
  const getLocalTimeZone = () => {
    const offset = -startDate.getTimezoneOffset();
    const sign = offset >= 0 ? "+" : "-";
    const pad = (num: number) => num.toString().padStart(2, "0");
    const hours = pad(Math.floor(Math.abs(offset) / 60));
    const minutes = pad(Math.abs(offset) % 60);
    return `UTC${sign}${hours}:${minutes}`;
  };
  const localTimeZone = getLocalTimeZone();

  // Function to format date
  const formatDate = (date: Date): JSX.Element => {
    const dayOfWeek = date
      .toLocaleDateString("en-US", { weekday: "short" })
      .toUpperCase();
    const dayOfMonth = date.getDate().toString().padStart(2, "0");
    return (
      <div>
        <div className={styles.dayOfWeek}>{dayOfWeek}</div>
        <div className={styles.dayOfMonth}>{dayOfMonth}</div>
      </div>
    ); // Format: "FRI" on top of "02"
  };
  const lastTimeLabelIndex = toRenderList(timeSlots).length - 7;
  useEffect(() => {
    const newTimeSlots = generateTimeSlots(startDate);
    const a = getAllTutors();
    const b = toRenderList(newTimeSlots);
    getTutorById(TutorId).then((res) => {
      // res.data.availableSlots
      const copiedTimeSlots = _.cloneDeep(newTimeSlots);

      res.data.availableSlots.forEach((slot) => {
        const startTime = new Date(slot.startTime);
        slot.startTime = new Date(slot.startTime);
        slot.endTime = new Date(slot.endTime);
        if (copiedTimeSlots[startTime.getDate().toString()]) {
          if (
            copiedTimeSlots[startTime.getDate().toString()][
              startTime.getHours().toString()
            ]
          ) {
            if (
              copiedTimeSlots[startTime.getDate().toString()][
                startTime.getHours().toString()
              ][startTime.getMinutes().toString()]
            ) {
              const thisSlot =
                copiedTimeSlots[startTime.getDate().toString()][
                  startTime.getHours().toString()
                ][startTime.getMinutes().toString()];

              if (slot.startTime.toString() == thisSlot.startTime.toString()) {
                copiedTimeSlots[startTime.getDate().toString()][
                  startTime.getHours().toString()
                ][startTime.getMinutes().toString()] = slot;
              }
            }
          }
        }
      });
      setTimeSlots(copiedTimeSlots);
    });
  }, [startDate]);
  return (
    <div style={{ width: "100%" }}>
      <div style={{ width: "100%" }}>
        <button
          onClick={() => {
            setStartDate((date) => {
              const newDate = new Date(date);
              newDate.setDate(newDate.getDate() - 7);
              return newDate;
            });
          }}
        >
          &lt;
        </button>
        <button
          onClick={() => {
            setStartDate((date) => {
              const newDate = new Date(date);
              newDate.setDate(newDate.getDate() + 7);
              return newDate;
            });
          }}
        >
          &gt;
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
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
            {toRenderList(timeSlots).map((slot, slotIndex) => {
              const isHoveredRow =
                hoveredTimeLabelIndex !== null &&
                hoveredTimeLabelIndex % 48 === slotIndex % 48;
              const isLastTimeLabel = slotIndex === lastTimeLabelIndex; // Check if this is the last time label ???

              // const isHoveredRow =
              // hoveredTimeLabelIndex !== null &&
              // Math.floor(hoveredTimeLabelIndex / 48) ===
              //   Math.floor(slotIndex / 48);
              return (
                <React.Fragment key={slotIndex}>
                  {slotIndex < 48 ? (
                    <div
                      className={`${styles.calendarSlot} ${
                        isHoveredRow ? styles.hoveredTimeLabel : ""
                      }`}
                      onMouseEnter={() => {
                        setHoveredTimeLabelIndex(slotIndex);
                      }}
                      onMouseLeave={() => {
                        setHoveredTimeLabelIndex(null);
                      }}
                    >
                      {/* {console.log} */}
                      {new Date(slot.startTime).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}{" "}
                      -{" "}
                      {new Date(slot.endTime).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </div>
                  ) : (
                    <div
                      className={`${styles.calendarSlot} ${
                        isHoveredRow ? styles.hoveredTimeLabel : ""
                      }
                    ${
                      slot.isBooked === null
                        ? ""
                        : slot.isBooked
                        ? styles.bookedSlot
                        : styles.unbookedSlot
                    }`}
                      onClick={() => {
                        setRenderSideBar(true);
                        setSlotSelected(slot);
                      }}
                    >
                      {slot.isBooked ? "booked" : ""}
                      {slot.startTime.toString()}
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
        {renderSideBar && <div>
        Slot Details
        </div>}
      </div>
    </div>
  );
};

export default Calendar;
