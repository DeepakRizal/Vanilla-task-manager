const taskInput = document.querySelector(".task-input")!;
const addTask = document.querySelector(".add-task");
const taskList = document.querySelector(".task-list")!;
const categoriesForm = document.querySelector(".categories")!;
const filterCategory = document.querySelector(".filter-category")!;

//types

type taskType = {
  task: string;
  categories: string;
};

let task: taskType = {
  task: "",
  categories: "All",
};

let jsonData = localStorage.getItem("tasks");

if (jsonData === null) {
  jsonData = "[]";
}

let tasks: taskType[] = JSON.parse(jsonData) || [];

// Function to load tasks from local storage
function loadTasks() {
  if (taskList) {
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
      categories.textContent = `category: ${task.categories}`;

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
}

// Load tasks on page load
loadTasks();

// Logic to add a task
if (addTask) {
  addTask.addEventListener("click", () => {
    if (taskInput instanceof HTMLInputElement) {
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
    }
  });
}

// Logic to delete a task
taskList.addEventListener("click", (event) => {
  if (event.target instanceof HTMLElement) {
    if (event.target?.classList.contains("delete")) {
      const taskDiv = event.target.closest(".task");

      const taskText = taskDiv?.querySelector(".text-content p")?.textContent;

      tasks = tasks.filter((task) => task.task !== taskText);
      localStorage.setItem("tasks", JSON.stringify(tasks));

      loadTasks(); // Reload the task list
    }
  }
});

// Update task category
categoriesForm.addEventListener("change", (event) => {
  if (event.target instanceof HTMLInputElement) {
    if (event.target?.type === "radio") {
      const selectedCategory = event.target.value;
      task.categories = selectedCategory;
    }
  }
});

//filter
filterCategory.addEventListener("change", (e) => {
  taskList.innerHTML = "";
  const target = e.target as HTMLSelectElement;

  const tasksToBeShown = tasks.filter((task) => {
    return task.categories === target?.value;
  });

  if (tasksToBeShown.length === 0 && target?.value !== "All") {
    taskList.innerHTML = `<p class="no-task">No tasks found for this category.</p>`;
  }

  if (target?.value === "All") {
    loadTasks();
  }

  tasksToBeShown.forEach((task) => {
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
});
