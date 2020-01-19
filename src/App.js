import React, { useState } from 'react';
import moment from 'moment';
import './App.css';


function App() {
  const [date, setDate] = useState(''); //use moment to initialize this
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [events, setEvent] = useState([]);


  const createEvent = () => {
    const event = { date: date, title: title, content: content, key: events.length + 1 };
    setEvent([...events, event]);
    setDate('');
    setTitle('');
    setContent('');
  }


  // comparetor won't work without some adjustment
  const deleteEvent = ({ target }) => {
    console.log(target.parentNode)
    const updated = events.filter(event => {
      if (!target.classList.contains(event.key)) {
        return event;
      }
    });
    setEvent(updated);
  }


  return (
    <div className="App">
      <h2>Acme Event Tracker</h2>
      <main>
        <div className="form-panel">
          <form onSubmit={e => e.preventDefault()}>
            <input type="text" value={date} placeholder="mm/dd/yyyy" onChange={e => { setDate(e.target.value) }}></input>
            <input type="text" value={title} placeholder="Title" onChange={e => { setTitle(e.target.value) }}></input>
            <input type="text" value={content} placeholder="Content" onChange={e => { setContent(e.target.value) }}></input>
            <button disabled={!date || !title || !content} onClick={() => createEvent() }>Create Event</button>
          </form>
        </div>
        <div className="display-panel">
          <ul>
            {events.map((event, idx) => {
              return (
                <li key={event.key}>
                  <div className="event-card">
                    <h4>{event.title}</h4>
                    <p>{event.date}</p>
                    <p>{event.content}</p> 
                    <button className={event.key} onClick={(e) => { deleteEvent(e) }}>X</button>
                  </div>
                </li>
              )
            })}
          </ul>
          </div>
      </main>
    </div>
  );
}

export default App;
