import React, { useState } from 'react';
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';

export default function Form(props) {
  const [currentName, setName] = useState(props.currentName || "");
  const [currentInterviewer, setInterviewer] = useState(props.interviewer || null)

  const reset = () => {
    setName("")
    setInterviewer('null')
  }

  const cancel = function() {
    reset();
    props.onCancel();
  }


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form 
        autoComplete="off"
        onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"        
            onChange={(event) => setName(event.target.value)}            
            value={currentName}
            placeholder={currentName ? currentName : "Please enter your name"}
            />

        </form>
        <InterviewerList 
        interviewers={props.interviewers}
        interviewer={currentInterviewer}
        onChange={(event) => setInterviewer(event)} 
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm onClick={() => props.onSave(currentName, currentInterviewer)}>Save</Button>        </section>
      </section>
    </main>
  )
}