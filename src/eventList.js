import React from 'react';

const EventList = ({ events, deleteEvent }) => {
  return (
    <div className="display-panel">
      <ul>
        {events.map((event) => {
          return (
            <li key={event.key}>
              <div className={event.relativity}>
                <h5>{event.date}</h5>
                <p>{event.title}</p>
                <p>{event.content}</p>
                <button className={event.key} onClick={(e) => deleteEvent(e)}>X</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default EventList;