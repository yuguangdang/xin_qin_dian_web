import { ChangeEvent, useState } from "react";
import { register } from "../../axios/userAxios";
import { useNavigate } from "react-router-dom";

//TODO: encrypt
const Register = () => {
  const [registerStudent, setRegisterStudent] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const changePasswdHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return (
    <>
      <button
        onClick={() => {
          setRegisterStudent(!registerStudent);
        }}
      >
        {registerStudent ? "Switch to teacher register" : "Switch to student register"}{" "}
      </button>
      <div>
        Email:
        <input onChange={changeEmailHandler} value={email} />
        PassWord:
        <input onChange={changePasswdHandler} value={password} />
      </div>
      <button
        onClick={() => {
          register(email, password, registerStudent ? "student" : "tutor").then(
            () => navigate("")
          );
        }}
      >
        {" "}
        Confirm
      </button>
    </>
  );
};

export default Register;
