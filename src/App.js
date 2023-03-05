import React,{useState, useRef, useEffect, useMemo,useCallback} from "react";
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';


//https://jsonplaceholder.typicode.com/comments

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

  const getData = async()=> {
    const res = await fetch(
        "https://jsonplaceholder.typicode.com/comments"
      ).then((res)=>res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author : it.email,
        content : it.body,
        emotion : Math.floor(Math.random() * 5 ) + 1,
        create_date : new Date().getTime(),
        id : dataId.current++,
      };
    });

    setData(initData);
  } //API 호출

  useEffect(()=>{
    setTimeout(()=> {
      getData();
    }, 1500);
  },[]);

  const onCreate = useCallback((author,content,emotion) => {
    const create_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      create_date,
      id: dataId.current
    }
    dataId.current += 1;
    setData((data)=>[newItem, ...data]);
  }, []);

  const onRemove = (targetId) => {
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it)=>
        it.id === targetId ? {...it, content:newContent} : it
      )
    );
  };

  const getDiaryAnalysis = useMemo(
    () => {
    const goodCount = data.filter((it)=>it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount/ data.length) * 100;
    return {goodCount, badCount, goodRatio};
  },[data.length]);

  const {goodCount, badCount, goodRatio} = getDiaryAnalysis;

  let name = "dev_404";
  return (
      <div className="App">
          <h2>Hello React! by.{name}의 일기장</h2>
          <DiaryEditor onCreate={onCreate}/>
          <div>전체 일기 : {data.length}</div>
          <div>기분 좋은 일기 개수 : {goodCount}</div>
          <div>기분 나쁜 일기 개수 : {badCount}</div>
          <div>기분 좋은 일기 비율 : {goodRatio}</div>
          <DiaryList onRemove={onRemove} onEdit={onEdit} diaryList={data} />
      </div>
  );
}
export default App;
