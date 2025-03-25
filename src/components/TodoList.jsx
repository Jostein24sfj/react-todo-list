import TodoItem from "./TodoItem.jsx";

export default function TodoList({
  data: { sortedData, deleteTask, editTask },
}) {
  if (sortedData.length === 0) {
    return <h3>No tasks. Add a task to begin.</h3>;
  }
  return (
    <>
      <ul>
        {sortedData.map((task) => {
          return (
            <TodoItem key={task.id} data={{ task, deleteTask, editTask }} />
          );
        })}
      </ul>
    </>
  );
}
