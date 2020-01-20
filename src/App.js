import React, { useState } from 'react';
import moment from 'moment';
import './App.css';
import EventList from './EventList';


function App() {
  const [date, setDate] = useState('');
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


  const doSort= () => {
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

  doSort();


  return (
    <div className="App">
      <h2>Acme Event Tracker</h2>
      <main>
        <div className="form-panel">
          <form onSubmit={e => e.preventDefault()}>
            <input type="text" value={date} placeholder="mm/dd/yyyy" onChange={e => setDate(e.target.value) }></input>
            <input type="text" value={title} placeholder="Title" onChange={e => setTitle(e.target.value) }></input>
            <input type="text" value={content} placeholder="Content" onChange={e => setContent(e.target.value) }></input>
            <button disabled={!date || !title || !content} onClick={createEvent}>Create Event</button>
          </form>
        </div>
        <EventList events={events} deleteEvent={deleteEvent}/>
      </main>
    </div>
  );
}

export default App;