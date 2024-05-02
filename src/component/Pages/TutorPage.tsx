import { ChangeEvent, useEffect, useState } from "react";
import {
  setBooking,
  cancelBooking,
  getAllTutors,
  getTutorById,
} from "../../axios/calendarAxios";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { type ITutor, type TutorsRes } from "../../utils/tpyes";
import Calendar from "../UI/Calendar/Calendar";
import { ClassNames } from "@emotion/react";
const TutorPage = () => {
  const [tutors, setTutors] = useState<ITutor[]>([]);
  const [selectedTutor, setSelectTutor] = useState<string>("default");
  const handleChangeSelectTutor = (e: SelectChangeEvent) => {
    setSelectTutor(e.target.value);
  };
  useEffect(() => {
    getAllTutors().then((res) => {
      setTutors(res.data);
      console.log(res);
    });
  }, []);
  return (
    <>
      Select Tutor
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedTutor}
        label="Age"
        onChange={handleChangeSelectTutor}
      >
        {tutors.map((tutor)=>{
          return <MenuItem value={tutor._id}>{tutor.name}</MenuItem>
        })}
      </Select>
      {selectedTutor !="default" ? <Calendar TutorId={selectedTutor} /> : <></>}
    </>
  );
};
export default TutorPage;
