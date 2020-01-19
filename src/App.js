import React, {useState} from 'react';
import moment from 'moment';
import './App.css';


function App() {
  const [date, setDate] = useState(''); //use moment to initialize this
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <div className="App">
      <div className="form-panel">
        <form onSubmit={e => e.preventDefault()}>
          <input type="text" onChange={e => { setDate(e.target.value) }}></input>
          <input type="text" placeholder="Title" onChange={e => { setTitle(e.target.value) }}></input>
          <input type="text" placeholder="Content" onChange={e => { setContent(e.target.value) }}></input>
          <p>{date}</p>
          <p>{title}</p>
          <p>{content}</p>
          <button>test</button>
        </form>
      </div>
      <div className="display-panel">
      {/*this will be ul of divs*/}
      </div>
    </div>
  );
}

export default App;
