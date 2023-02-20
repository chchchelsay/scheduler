import React, {Fragment} from 'react';
import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from "hooks/useVisualMode";
import Form from './Form';
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRMING";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function onSave(name, interviewer) {
  const interview = {
      student: name,
      interviewer
    };
  transition(SAVING);
  props.bookInterview(props.id, interview)
  .then(() => transition(SHOW))
  .catch(error => transition(ERROR_SAVE, true));
};

function onDelete() {
  transition(CONFIRM)
};

function onConfirm() {
  transition(DELETING, true);
  props
    .cancelInterview(props.id, props.interview)
    .then(() => transition(EMPTY))
    .catch(error => {
      transition(ERROR_DELETE, true);
    })
};

function onAdd() {
  transition(CREATE)
};

function onEdit() {
  transition(EDIT)
};

function onCancel() {
    back();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  return (
    <Fragment>
    <article className="appointment">
      
      <Header time={props.time}/>

      {mode === EMPTY && (
          <Empty onAdd={onAdd}/>
        )}

      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
          onEdit={onEdit}/>
        )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => transition(EMPTY)}
          onSave={onSave}/>
        )}

      {mode === SAVING && (
        <Status
          message={`Saving...`}/>
        )}

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
      
      {mode === EDIT && (
          <Form
            interviewers={props.interviewers}
            onCancel={onCancel}
            onSave={onSave}
            name={props.interview.student}
            interviewer={props.interview.interviewer.id}/>
        )}

      {mode === ERROR_SAVE && (
          <Error
            message={`ERROR: Appointment not saved.`}
            onClose={onCancel}/>
        )}

      {mode === ERROR_DELETE && (
          <Error
            message={`ERROR: Appointment not deleted.`}
            onClose={onCancel}/>
        )}

    </article>
    </Fragment>
  )
}