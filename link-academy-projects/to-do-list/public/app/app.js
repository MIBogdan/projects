
import Task from "./models/Task.js";
import TaskList from "./models/TaskList.js";
import TaskStorage from "./models/TaskStorage.js";

const todoList = document.querySelector(".task-container");
const doneList = document.querySelector(".task-container-done");


document.addEventListener("DOMContentLoaded", TaskStorage.displayTasks());


document
  .querySelector(".button-add-task")
  .addEventListener("click", addTodoCard);


function addTodoCard(event) {
  event.preventDefault();


  const title = document.querySelector("#form-task-title").value,
    description = document.querySelector("#form-task-description").value,
    dueDate = document.querySelector("#form-task-duedate").value;


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
  const task = new Task();
  const taskList = new TaskList();
  const cardSelected = e.target.parentElement.parentElement.parentElement;
  task.uid = cardSelected.querySelector(".task-uid").innerText;
  task.title = cardSelected.querySelector(".task-title").innerText;
  task.description = cardSelected.querySelector(".task-description").innerText;
  task.dueDate = cardSelected.querySelector(".task-duedate").innerText;


  if (e.target.classList.contains("task-delete")) {
    console.log("task.uid on task-delete\n" + task + "\n" + task.uid);

    TaskStorage.removeTask(task); 
    taskList.deleteTask(cardSelected); 

    const message = "Task has been removed from list.";
    taskList.displayCustomAlert(message, "alert-success");

    e.preventDefault();
  }


  if (
    e.target.classList.contains("task-complete") ||
    e.target.classList.contains("task-uncomplete")
  ) {
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
    if (cardSelected.classList.contains("task-done") === false) {
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