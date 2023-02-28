import React from "react";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
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
  const CONFIRM = "CONFIRM";
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
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview, mode === EDIT)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }

  function onDelete(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(DELETING, true);

    props
      .cancelInterview(props.id, interview)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />

      {mode === EMPTY && props.lastAppointment === false && (
        <Empty onAdd={() => transition(CREATE)} />
      )}

      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => transition(EMPTY)}
          onSave={(name, interviewer) => {
            onSave(name, interviewer);
          }}
        />
      )}

      {mode === SAVING && <Status message={`Saving...`} />}

      {mode === DELETING && <Status message={`Deleting...`} />}

      {mode === CONFIRM && (
        <Confirm
          onCancel={() => {
            transition(SHOW);
          }}
          onConfirm={(name, interviewer) => {
            onDelete(name, interviewer);
          }}
          message={`Are you sure you want to delete this?`}
        />
      )}

      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={onSave}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error message={`ERROR: Appointment not saved.`} onClose={back} />
      )}

      {mode === ERROR_DELETE && (
        <Error message={`ERROR: Appointment not deleted.`} onClose={back} />
      )}
    </article>
  );
}
