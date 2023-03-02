import { useState, useRef } from 'react';

const DiaryEditor = ({onCreate}) => {
    //React에서 Dom요소에 접근을 할 수 있게 해주는 useRef();
    const authorInput = useRef();
    const contentArea = useRef();
    const [state, setState] = useState({
        author: "",
        content: "",
        emotion: 1,
    });

    const handleChangeState =(e) => {
        setState({
            ...state, //스프레드 연산자 사용하여 펼쳐준다.
            [e.target.name] : e.target.value,
        })
    };
    const handleSumbit = () => {
        if(state.author.length < 1) {
            authorInput.current.focus();
            return
        }
        if(state.content.length < 5) {
            contentArea.current.focus();
            return
        }
        onCreate(state.author,state.content,state.emotion);
        alert("저장성공");
        setState({
            author: "",
            content: "",
            emotion: 1,
        })
    };
    return (
        <div className="DiaryEditor">
            <h2>오늘의 일기</h2>
            <div>
                <input 
                    name="author"
                    ref={authorInput}
                    value={state.author} 
                    onChange={handleChangeState}
                />
            </div>
            <div>
                <textarea 
                    ref={contentArea}
                    name="content"
                    value={state.content} 
                    onChange={handleChangeState} 
                />
            </div>
            <div>
                <select 
                    name="emotion" 
                    value={state.emotion}
                    onChange={handleChangeState}
                >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </div>
            <div>
                <button onClick={handleSumbit}>일기 저장하기</button>
            </div>
        </div>
    )
}

export default DiaryEditor;