const taskInput = document.querySelector(".task-input");
const addTask = document.querySelector(".add-task");
const taskList = document.querySelector(".task-list");

const deleteTask = document.querySelector(".delete");
const categoriesForm = document.querySelector(".categories");

let task = {
  task: "",
  categories: "",
};

let tasks = [];

addTask.addEventListener("click", () => {
  task.task = taskInput.value;

  console.log(task);

  if (task.task.trim() === "") {
    alert("Please input your task");
  }

  const newTaskElement = document.createElement("div");
  newTaskElement.classList.add("task");

  const taskText = document.createElement("p");
  taskText.textContent = task.task;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.textContent = "Delete";

  newTaskElement.appendChild(taskText);
  newTaskElement.appendChild(deleteButton);

  taskList.appendChild(newTaskElement);

  taskInput.value = "";
});

taskList.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete")) {
    const taskItem = event.target.closest(".task");
    taskItem.remove();
  }
});

deleteTask.addEventListener("click", (e) => {
  const elementToBeDeleted = e.currentTarget.parentNode;

  console.log(elementToBeDeleted);

  elementToBeDeleted.remove();
});

categoriesForm.addEventListener("change", (event) => {
  if (event.target.type === "radio") {
    const selectedCategory = event.target.value;
    task.categories = selectedCategory;
  }
});
