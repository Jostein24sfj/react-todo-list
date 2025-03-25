import { useState } from "react";

export default function TodoItem({ data: { task, editTask, deleteTask } }) {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [updatedTaskName, setUpdatedTaskName] = useState(task.name);

  function changeCompleted() {
    editTask(task.id, { ...task, completed: !task.completed });
  }

  const formattedTime = task.timestamp.toLocaleString("en-GB");
  function handleEdit() {
    if (isReadOnly) {
      editTask(task.id, { ...task, name: updatedTaskName });
    }
    setIsReadOnly((prev) => !prev);
  }

  return (
    <>
      <li>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={changeCompleted}
        />
        <p>{formattedTime}</p>
        <input
          type="text"
          value={updatedTaskName}
          readOnly={isReadOnly}
          onChange={(e) => setUpdatedTaskName(e.target.value)}
        />
        <button onClick={handleEdit}>{isReadOnly ? "Edit" : "Save"}</button>
        <button onClick={() => deleteTask(task.id)}>Delete</button>
      </li>
    </>
  );
}
