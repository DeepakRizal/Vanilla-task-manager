const taskInput = document.querySelector(".task-input");
const addTask = document.querySelector(".add-task");
const taskList = document.querySelector(".task-list");

const deleteTask = document.querySelector(".delete");

let task = "";

addTask.addEventListener("click", () => {
  task = taskInput.value;

  if (task.trim() === "") {
    alert("Please input your task");
  }

  const newTaskElement = document.createElement("div");
  newTaskElement.classList.add("task");

  const taskText = document.createElement("p");
  taskText.textContent = task;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.textContent = "Delete";

  newTaskElement.appendChild(taskText);
  newTaskElement.appendChild(deleteButton);

  taskList.appendChild(newTaskElement);

  taskInput.value = "";
});

deleteTask.addEventListener("click", (e) => {
  const elementToBeDeleted = e.currentTarget.parentNode;
  console.log(elementToBeDeleted);
  elementToBeDeleted.remove();
});
