// Header: Overskrift, legg til task input, sortering og vis/skjul fullførte tasks
// TodoList: Skal liste opp alle taska som er lagt til
// TodoItem: Komponent for de individuelle taskene
import Header from "./components/Header.jsx";
import TodoList from "./components/TodoList.jsx";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [todoData, setTodoData] = useState(() => {
    const savedData = localStorage.getItem("todoData");
    return savedData
      ? JSON.parse(savedData).map((task) => ({
          ...task,
          timestamp: new Date(task.timestamp),
        }))
      : [];
  });

  const [sortOption, setSortOption] = useState(() => {
    const savedSort = localStorage.getItem("sortOption");
    return JSON.parse(savedSort) || { sortBy: "newest", hideCompleted: false };
  });

  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(todoData));
    localStorage.setItem("sortOption", JSON.stringify(sortOption));
  }, [todoData, sortOption]);

  function addTask(newTask) {
    setTodoData((prev) => [...prev, newTask]);
  }

  function deleteTask(id) {
    setTodoData((prev) => prev.filter((task) => task.id !== id));
  }

  function editTask(id, updatedTask) {
    setTodoData((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
  }

  const sortedData = [...todoData]
    .filter((task) => !task.completed || !sortOption.hideCompleted)
    .sort((a, b) => {
      switch (sortOption.sortBy) {
        case "a-to-z":
          return a.name.localeCompare(b.name);
        case "z-to-a":
          return b.name.localeCompare(a.name);
        case "oldest":
          return a.timestamp - b.timestamp;
        case "newest":
          return b.timestamp - a.timestamp;
      }
    });

  return (
    <>
      <Header data={{ addTask, sortOption, setSortOption }} />
      <br />
      <br />
      <TodoList data={{ sortedData, editTask, deleteTask }} />
      <br />
      <br />
    </>
  );
}

export default App;
