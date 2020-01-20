import React from 'react';

const CreateList = (props) => {
  return (
    <div className="form-panel">
      <form onSubmit={e => e.preventDefault()}>
        <input type="text" value={props.date} placeholder="mm/dd/yyyy" onChange={e => props.setDate(e.target.value)}></input>
        <input type="text" value={props.title} placeholder="Title" onChange={e => props.setTitle(e.target.value)}></input>
        <input type="text" value={props.content} placeholder="Content" onChange={e => props.setContent(e.target.value)}></input>
        <button disabled={!props.date || !props.title || !props.content} onClick={props.createEvent}>Create Event</button>
      </form>
    </div>
  )
}

export default CreateList;