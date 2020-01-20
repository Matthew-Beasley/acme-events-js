import React, { useState } from 'react';
import moment from 'moment';
import './App.css';


function App() {
  const [date, setDate] = useState(''); //use moment to initialize this
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [events, setEvent] = useState([]);


  const setColor = () => {
    if (events.length > 0) {
      events.forEach(event => {
        const time = event.date.replace(/\//g, '');
        const momentInTime = moment(time, 'MMDDYYYY').fromNow()
        
        if (momentInTime.includes('ago')) {
          event.relativity = 'past';
        }
        else {
          event.relativity = 'future';
        }
      })
    }
  }

  setColor(); //don't like this but events.length is one short in createEvent


  const createEvent = () => {
    const event = { date: date, title: title, content: content, relativity: 'future' , key: events.length + 1 };
    setEvent([...events, event]);
    setDate('');
    setTitle('');
    setContent('');
  }


  // comparetor won't work without some adjustment
  const deleteEvent = ({ target }) => {
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
