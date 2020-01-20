import React from 'react';

const EventList = ({ events, deleteEvent }) => {
    return (
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
    )
}

export default EventList;