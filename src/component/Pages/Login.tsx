import { useNavigate } from "react-router-dom";
import { login } from "../../axios/userAxios";
import { ChangeEvent, useState } from "react";
const LoginPage = ()=>{
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const changePasswdHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);}


  return (<>
        Login
        <div>
        Email:
        <input onChange={changeEmailHandler} value={email} />
        PassWord:
        <input onChange={changePasswdHandler} value={password} />
      </div>
      <button
        onClick={() => {
          login(email, password).then(
            (res) => {localStorage.setItem("UID", res.data.user._id); 
            localStorage.setItem("role", res.data.user.role); 
            localStorage.setItem("token", res.data.token); navigate("/tutor");} // 
          );
        }}
      >
        {" "}
        Confirm
      </button>
  </>)
  
}

export default LoginPage;