import React, { useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState(["Đi Ăn", "Đi Chơi", "Đi Dạo"]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTask = tasks.filter((_, i) => i !== index);
    setTasks(updatedTask);
  }

  function editTask(index) {
    setEditIndex(index);
    setEditedTask(tasks[index]);
  }

  function saveEditedTask(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index] = editedTask;
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditedTask("");
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTask = [...tasks];
      [updatedTask[index], updatedTask[index - 1]] = [
        updatedTask[index - 1],
        updatedTask[index],
      ];
      setTasks(updatedTask);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTask = [...tasks];
      [updatedTask[index], updatedTask[index + 1]] = [
        updatedTask[index + 1],
        updatedTask[index],
      ];
      setTasks(updatedTask);
    }
  }

  return (
    <div className="to-do-list">
      <h1>To Do List</h1>
      <div>
        <input
          type="text"
          placeholder="Nhập nhiệm vụ"
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={addTask}>
          Thêm
        </button>
      </div>
      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
                <button
                  className="save-button"
                  onClick={() => saveEditedTask(index)}
                >
                  Lưu
                </button>
              </>
            ) : (
              <>
                <span className="text">{task}</span>
                <button
                  className="delete-button"
                  onClick={() => deleteTask(index)}
                >
                  Xóa
                </button>
                <button className="edit-button" onClick={() => editTask(index)}>
                  Sửa
                </button>
                <button
                  className="move-button"
                  onClick={() => moveTaskUp(index)}
                >
                  Up
                </button>
                <button
                  className="move-button"
                  onClick={() => moveTaskDown(index)}
                >
                  Down
                </button>
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
