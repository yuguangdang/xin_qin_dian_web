import "./styles/colors.module.css";
import Calendar from "./component/UI/Calendar/Calendar";
import styles from "./App.module.css"; // Import the CSS module
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Pages/Login";
import Register from "./component/Pages/Register";
import TutorPage from "./component/Pages/TutorPage";
function App() {
  return (
    <div className={styles.appContainer}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tutor" element={<TutorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
