import React,{useState,useRef} from "react";
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

// const dummyList = [
//   {
//     id: 1,
//     author:"버본",
//     content: "코드네임 버본",
//     emotion:5,
//     create_date: new Date().getTime()
//   },
//   {
//     id: 2,
//     author:"베르무트",
//     content: "코드네임 베르무트",
//     emotion:4,
//     create_date: new Date().getTime()
//   },
//   {
//     id: 3,
//     author:"진",
//     content: "코드네임 진",
//     emotion:1,
//     create_date: new Date().getTime()
//   },
//   {
//     id: 4,
//     author:"아카이 슈이치",
//     content: "FBI",
//     emotion:4,
//     create_date: new Date().getTime()
//   },
//   {
//     id: 5,
//     author:"디무",
//     content: "팝마트 캐릭터 Dimoo",
//     emotion:3,
//     create_date: new Date().getTime()
//   },
// ]
const App =() => {
  const [data,setData] = useState([]);

  const dataId = useRef(0);

  const onCreate = (author,content,emotion) => {
    const create_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      create_date,
      id: dataId.current
    }
    dataId.current += 1;
    setData([newItem, ...data]);
  };
  let name = "dev_404";
  return (
      <div className="App">
          <h2>Hello React! by.{name}의 일기장</h2>
          <DiaryEditor onCreate={onCreate}/>
          <DiaryList diaryList={data} />
      </div>
  );
}
export default App;
