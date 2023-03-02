import './App.css';
import DiaryEditor from './DiaryEditor';

function App() {
  let name = "dev_404";
  return (
      <div className="App">
          <h2>Hello React! by.{name}의 일기장</h2>
          <DiaryEditor />
      </div>
  );
}

export default App;
