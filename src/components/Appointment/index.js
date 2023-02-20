import React, {Fragment} from 'react';
import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from "hooks/useVisualMode";
import Form from './Form';
import Status from "./Status";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVE = "SAVING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVE);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
  }

  return (
    <Fragment>
      
      <Header time={props.time} 
      />

      <article className="appointment">

      {mode === EMPTY && 
      <Empty onAdd={() => transition(CREATE)} 
      />}
      
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />)}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => transition(EMPTY)}
          onSave={save}
        />)}

      {mode === SAVE && (
        <Status
          message={`Saving...`}
        />)}

</article>
    </Fragment>
  )
}