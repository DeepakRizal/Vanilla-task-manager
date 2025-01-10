const taskInput = document.querySelector(".task-input");
const addTask = document.querySelector(".add-task");
const taskList = document.querySelector(".task-list");
const categoriesForm = document.querySelector(".categories");
const filterCategory = document.querySelector(".filter-category");

let task = {
  task: "",
  categories: "All",
};

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to load tasks from local storage
function loadTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskList.innerHTML = `<p class="no-task">No tasks found.</p>`;
  }

  tasks.forEach((task) => {
    const newTaskElement = document.createElement("div");
    newTaskElement.classList.add("task");

    const textContent = document.createElement("div");
    textContent.classList.add("text-content");
    const categories = document.createElement("span");

    const taskText = document.createElement("p");
    taskText.textContent = `${task.task}`;
    categories.textContent = `${task.categories}`;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.textContent = "Delete";

    textContent.appendChild(taskText);
    textContent.appendChild(categories);

    newTaskElement.appendChild(textContent);
    newTaskElement.appendChild(deleteButton);

    console.log(newTaskElement);

    taskList.appendChild(newTaskElement);
  });
}

// Load tasks on page load
loadTasks();

// Logic to add a task
addTask.addEventListener("click", () => {
  if (taskInput.value.trim() === "") {
    alert("Please input your task");
    return;
  }

  const newTask = {
    task: taskInput.value.trim(),
    categories: task.categories,
  };

  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  loadTasks(); // Reload the task list
  taskInput.value = "";
});

// Logic to delete a task
taskList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    const taskDiv = event.target.closest(".task");

    const taskText = taskDiv.querySelector(".text-content p").textContent;
    console.log(taskText);

    tasks = tasks.filter((task) => task.task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    loadTasks(); // Reload the task list
  }
});

// Update task category
categoriesForm.addEventListener("change", (event) => {
  if (event.target.type === "radio") {
    const selectedCategory = event.target.value;
    task.categories = selectedCategory;
  }
});

//filter
filterCategory.addEventListener("change", (e) => {
  taskList.innerHTML = "";
  const tasksToBeShown = tasks.filter(
    (task) => task.categories === e.target.value
  );

  if (tasksToBeShown.length === 0 && e.target.value !== "All") {
    taskList.innerHTML = `<p class="no-task">No tasks found for this category.</p>`;
  }

  if (e.target.value === "All") {
    loadTasks();
  }

  tasksToBeShown.forEach((task) => {
    const newTaskElement = document.createElement("div");
    newTaskElement.classList.add("task");

    const taskText = document.createElement("p");
    taskText.textContent = `${task.task}`;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.textContent = "Delete";

    newTaskElement.appendChild(taskText);
    newTaskElement.appendChild(deleteButton);

    taskList.appendChild(newTaskElement);
  });
});
