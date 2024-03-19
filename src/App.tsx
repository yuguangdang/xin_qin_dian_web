import './styles/colors.module.css';
import Calendar from './component/UI/Calendar/Calendar';
import styles from './App.module.css'; // Import the CSS module

function App() {
  return (
    <div className={styles.appContainer}>
      <Calendar />
    </div>
  );
}

export default App;
