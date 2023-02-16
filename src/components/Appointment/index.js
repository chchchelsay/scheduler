import React from 'react';
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from './Form';

export default function Appointment (props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  //const SAVING = "SAVING";
  //const DELETING = "DELETING";
  //const ERROR = "ERROR";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function onAdd() {
    transition(CREATE)
  }
  function onCancel() {
    back()
  }
  function onDelete() {
    transition(CONFIRM)
  }
  function onEdit() {
    transition(EDIT)
  }

  return (
  <>
  <Header time={props.time} />  
  <article className="appointment">
    {mode === EMPTY && (
      <Empty onAdd={onAdd} />
    )}
    {mode === SHOW && (
      <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer.name}
      onDelete={onDelete}
      onEdit={onEdit}
      />
    )}
    {mode === CREATE && (
      <Form
      interviewers={[]}
      onCancel={onCancel}
    
      />
    )}
  </article>
  </>
  )
}