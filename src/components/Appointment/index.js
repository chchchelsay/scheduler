import React, {Fragment} from 'react';
import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from "hooks/useVisualMode";
import Form from './Form';
import Status from "./Status";
import Confirm from "./Confirm";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRMING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
function onCancel() {
    back()
  };

function onSave(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
  };

function onDelete() {
    transition(CONFIRM)
  };

function onConfirm() {
    transition(DELETING, true);
    props.cancelInterview(props.id, props.interview)
      .then(() => transition(EMPTY))
  };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <Fragment>
    <article className="appointment">
      
      <Header time={props.time}/>

      {mode === EMPTY && 
      <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}/>)}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => transition(EMPTY)}
          onSave={onSave}/>)}

      {mode === SAVING && (
        <Status
          message={`Saving...`}
        />)}

      {mode === DELETING && (
          <Status
            message={`Deleting...`}/>
        )}
      
      {mode === CONFIRM && (
          <Confirm
            message={`Delete appointment?`}
            onCancel={onCancel}
            onConfirm={onConfirm}/>
        )}

    </article>
    </Fragment>
  )
}