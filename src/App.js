import React, { useState } from 'react';
import moment from 'moment';
import './App.css';


function App() {
  const [date, setDate] = useState(''); //use moment to initialize this
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [events, setEvent] = useState([]);


  const createEvent = () => {
    const time = date.replace(/\//g, '');
    const milliseconds = moment(time, 'MMDDYYYY').valueOf();

    const event = {
      date: date,
      milliseconds: milliseconds,
      title: title,
      content: content,
      relativity: 'future',
      key: events.length + 1
    };

    setEvent([...events, event]);
    setDate('');
    setTitle('');
    setContent('');
  }


  const deleteEvent = ({ target }) => {
    const updated = events.filter(event => {
      if (!target.classList.contains(event.key)) {
        return event;
      }
    });
    setEvent(updated);
  }


  const setColor = () => {
    const now = moment().valueOf();
    events.forEach(event => {
      const diff = Math.abs(now - event.milliseconds)
      if (diff < 86400000) {
        event.relativity = 'today';
      }
      else if (now > event.milliseconds) {
        event.relativity = 'past';
      }
      else if (now < event.milliseconds) {
        event.relativity = 'future'
      }
    })

    events.sort((a, b) => {
      return b.milliseconds - a.milliseconds
    })
  }

  setColor();
  

  return (
    <div className="App">
      <h2>Acme Event Tracker</h2>
      <main>
        <div className="form-panel">
          <form onSubmit={e => e.preventDefault()}>
            <input type="text" value={date} placeholder="mm/dd/yyyy" onChange={e => { setDate(e.target.value) }}></input>
            <input type="text" value={title} placeholder="Title" onChange={e => { setTitle(e.target.value) }}></input>
            <input type="text" value={content} placeholder="Content" onChange={e => { setContent(e.target.value) }}></input>
            <button disabled={!date || !title || !content} onClick={() => { createEvent() } }>Create Event</button>
          </form>
        </div>
        <div className="display-panel">
          <ul>
            {events.map((event, idx) => {
              return (
                <li key={event.key}>
                  <div className={event.relativity}>
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
