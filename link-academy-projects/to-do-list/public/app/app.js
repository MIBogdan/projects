import Task from "./models/Task.js";
import TaskList from "./models/TaskList.js";
import TaskStorage from "./models/TaskStorage.js";

const todoList = document.querySelector(".task-container");
const doneList = document.querySelector(".task-container-done");

document.addEventListener("DOMContentLoaded", TaskStorage.displayTasks);

document
    .querySelector(".button-add-task")
    .addEventListener("click", addTodoCard);

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

if (todoList) {
    todoList.addEventListener("click", deleteCheckEdit);
}
if (doneList) {
    doneList.addEventListener("click", deleteCheckEdit);
}

function deleteCheckEdit(e) {
    const cardSelected = e.target.closest(".task-card");
    if (!cardSelected) return;

    const taskUidElement = cardSelected.querySelector(".task-uid");
    const taskTitleElement = cardSelected.querySelector(".task-title");
    const taskDescriptionElement = cardSelected.querySelector(".task-description");
    const taskDueDateElement = cardSelected.querySelector(".task-duedate");

    if (
        !taskUidElement ||
        !taskTitleElement ||
        !taskDescriptionElement ||
        !taskDueDateElement
    ) {
        console.error("One or more elements are missing in the selected task card.");
        return;
    }

    const task = new Task();
    const taskList = new TaskList();
    task.uid = taskUidElement.innerText.split(" ")[2];
    task.title = taskTitleElement.innerText;
    task.description = taskDescriptionElement.innerText;
    task.dueDate = taskDueDateElement.innerText;

    if (e.target.classList.contains("task-delete")) {
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

        if (cardSelected.classList.contains("task-done")) {
            task.markAsDone();
            TaskStorage.updateTask(task);
            return;
        }
        if (!cardSelected.classList.contains("task-done")) {
            task.markAsUndone();
            TaskStorage.updateTask(task);
        }
    }

    if (e.target.classList.contains("task-edit")) {
        cardSelected.classList.toggle("enableEditing");
        taskList.editTaskCard(cardSelected, task);
    }
}

let year = new Date().getFullYear();
document.getElementById("year").innerHTML = `&copy ${year} Marius Bogdan. All rights reserved.`;
