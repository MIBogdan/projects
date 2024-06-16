// app.js
import Task from "./models/Task.js";
import TaskList from "./models/TaskList.js";
import TaskStorage from "./models/TaskStorage.js";

const todoList = document.querySelector(".task-container");
const doneList = document.querySelector(".task-container-done");

document.addEventListener("DOMContentLoaded", TaskStorage.displayTasks());

document.querySelector(".button-add-task").addEventListener("click", addTodoCard);

function addTodoCard(event) {
  event.preventDefault();

  const title = document.querySelector("#form-task-title").value;
  const description = document.querySelector("#form-task-description").value;
  const dueDate = document.querySelector("#form-task-duedate").value;

  const task = new Task(title, description, dueDate);
  const taskList = new TaskList();
  console.log("## see prototype taskList:\n" + taskList);

  if (title === "" || description === "" || dueDate === "") {
    const message = "Please add information to all fields.";
    taskList.displayCustomAlert(message, "alert-warning");
    return;
  }

  TaskStorage.saveLocal(task);
  taskList.addTaskToList(task);
  taskList.clearForm();

  const message = "New task added to list.";
  taskList.displayCustomAlert(message, "alert-success");
}

todoList.addEventListener("click", deleteCheckEdit);
doneList.addEventListener("click", deleteCheckEdit);

function deleteCheckEdit(e) {
  const cardSelected = e.target.closest('.task-card'); // Adjusted to select the closest .task-card
  console.log(cardSelected); // Debugging statement

  const taskUidElement = cardSelected.querySelector(".task-uid");
  const taskTitleElement = cardSelected.querySelector(".task-title");
  const taskDescriptionElement = cardSelected.querySelector(".task-description");
  const taskDueDateElement = cardSelected.querySelector(".task-duedate");

  console.log(taskUidElement, taskTitleElement, taskDescriptionElement, taskDueDateElement); // Debugging statement

  if (!taskUidElement || !taskTitleElement || !taskDescriptionElement || !taskDueDateElement) {
    console.error("One or more elements are missing in the selected task card.");
    return;
  }

  const task = new Task();
  const taskList = new TaskList();
  task.uid = taskUidElement.innerText.split(' ')[2]; // Extract UID from the innerText
  task.title = taskTitleElement.innerText;
  task.description = taskDescriptionElement.innerText;
  task.dueDate = taskDueDateElement.innerText;

  if (e.target.classList.contains("task-delete")) {
    console.log("task.uid on task-delete\n" + task + "\n" + task.uid);

    TaskStorage.removeTask(task); 
    taskList.deleteTask(cardSelected); 

    const message = "Task has been removed from list.";
    taskList.displayCustomAlert(message, "alert-success");

    e.preventDefault();
  }

  if (e.target.classList.contains("task-complete") || e.target.classList.contains("task-uncomplete")) {
    taskList.moveTaskCard(e.target, cardSelected); 
    taskList.toggleStyleTaskCard(e.target, cardSelected); 
    taskList.hideShowElement(cardSelected); 
    console.log("### task-complete-DONE ?\n" + cardSelected.classList);

    if (cardSelected.classList.contains("task-done")) {
      task.markAsDone();
      console.log("done: " + task.done);
      TaskStorage.updateTask(task);
      return;
    }
    if (!cardSelected.classList.contains("task-done")) {
      task.markAsUndone();
      TaskStorage.updateTask(task);
      console.log("done: " + task.done);
    }
  }

  if (e.target.classList.contains("task-edit")) {
    console.log("## classList:\n" + cardSelected.classList);

    cardSelected.classList.toggle("enableEditing");
    console.log("## classList after toggle:\n" + cardSelected.classList);

    taskList.editTaskCard(cardSelected, task);
    console.log("## Show taskUid \n" + task.uid);
  }
}


let year = new Date().getFullYear();
document.getElementById('year').innerHTML = `&copy ${year} Marius Bogdan. All rights reserved.`;
