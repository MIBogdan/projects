export default class TaskCard {
    static createTaskCard(task) {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("task-card");
      cardDiv.classList.add("task-todo"); // -------------------- class for background red --
      if (task.done === true) {
        cardDiv.classList.toggle("task-done"); // --------------- T O G G L E to get background green --
      }
      cardDiv.appendChild(this.taskContent(task));
      return cardDiv; // will be appended to div.task-container of 'todoList' or 'DoneList'
    }
  
    // get content for cardDiv
    static taskContent(task) {
      const taskContent = document.createElement("div");
      taskContent.classList.add("task-content");
      taskContent.classList.add("vertical");
  
      taskContent.appendChild(this.taskTitle(task));
      taskContent.appendChild(this.inputTitle());
  
      taskContent.appendChild(this.taskDescription(task));
      taskContent.appendChild(this.inputDesc());
  
      taskContent.appendChild(this.taskDue(task));
      taskContent.appendChild(this.inputDue());
  
      taskContent.appendChild(this.taskControls(task));
      taskContent.appendChild(this.taskUid(task));
  
      return taskContent; // will be appended to cardDiv (main div of a taskCard)
    }
    // create labels for task details (title, description, dueDate) + + input fields (only available for editing)
    static taskTitle(task) {
      const taskTitle = document.createElement("h2");
      taskTitle.classList.add("task-title");
      taskTitle.innerText = task.title; // -------------------- T I T L E
      return taskTitle; // will be appended to div.task-content
    }
    static inputTitle() {
      const inputTitle = document.createElement("input");
      inputTitle.type = "text";
      inputTitle.placeholder = "Title";
      inputTitle.classList.add("enableInputTitle");
      inputTitle.setAttribute("maxlength", "100");
      return inputTitle;
    }
    static taskDescription(task) {
      const taskDescription = document.createElement("p");
      taskDescription.classList.add("task-description");
      taskDescription.innerText = task.description; // -------- D E S C R I P T I O N
      return taskDescription; // will be appended to div.task-content
    }
    static inputDesc() {
      const inputDesc = document.createElement("textarea");
      inputDesc.placeholder = "Description";
      inputDesc.classList.add("enableInputDesc");
      inputDesc.setAttribute("maxlength", "500");
      inputDesc.setAttribute("rows", "5");
      return inputDesc;
    }
    static taskDue(task) {
      const taskDue = document.createElement("p");
      taskDue.classList.add("task-duedate");
      taskDue.innerText = task.dueDate; // -------------------- D U E D A T E ("2020-12-18")
      return taskDue; // will be appended to div.task-content
    }
    static inputDue() {
      const inputDue = document.createElement("input");
      inputDue.type = "date";
      inputDue.placeholder = "DueDate";
      inputDue.classList.add("enableInputDue");
      return inputDue;
    }
    // label for unique ID -> important for usage of localStorage
    static taskUid(task) {
      const taskUid = document.createElement("span");
      taskUid.classList.add("task-uid");
      taskUid.innerText = `Task UID ${task.uid}`; // ------------------------ U I D (unique Identifier)
      // taskUid.style.display = "none";
      return taskUid;
    }
  
    // 'Button'-Section allows to delete, edit, checkMark (Move) a Task
    static taskControls(task) {
      const taskControls = document.createElement("div");
      taskControls.classList.add("horizontal");
      taskControls.classList.add("task-controls");
      taskControls.classList.add("task-controls-todo");
      if (task.done === true) {
        taskControls.classList.toggle("task-controls-done"); // - T O G G L E for bg green --
      }
  
      taskControls.appendChild(this.trashBtn());
      taskControls.appendChild(this.editBtn());
      taskControls.appendChild(this.completeBtn(task));
  
      return taskControls; // will be appended to div.task-content
    }
  
    static trashBtn() {
      const trashBtn = document.createElement("a");
      trashBtn.href = "#delete";
      trashBtn.classList.add("task-delete");
      trashBtn.innerHTML = `<svg id="fi_3096673" enable-background="new 0 0 512 512" height="12" viewBox="0 0 512 512" width="12" xmlns="http://www.w3.org/2000/svg"><g><path d="m424 64h-88v-16c0-26.467-21.533-48-48-48h-64c-26.467 0-48 21.533-48 48v16h-88c-22.056 0-40 17.944-40 40v56c0 8.836 7.164 16 16 16h8.744l13.823 290.283c1.221 25.636 22.281 45.717 47.945 45.717h242.976c25.665 0 46.725-20.081 47.945-45.717l13.823-290.283h8.744c8.836 0 16-7.164 16-16v-56c0-22.056-17.944-40-40-40zm-216-16c0-8.822 7.178-16 16-16h64c8.822 0 16 7.178 16 16v16h-96zm-128 56c0-4.411 3.589-8 8-8h336c4.411 0 8 3.589 8 8v40c-4.931 0-331.567 0-352 0zm313.469 360.761c-.407 8.545-7.427 15.239-15.981 15.239h-242.976c-8.555 0-15.575-6.694-15.981-15.239l-13.751-288.761h302.44z"></path><path d="m256 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"></path><path d="m336 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"></path><path d="m176 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"></path></g></svg>`;
      return trashBtn; // will be appended to div.task-controls
    }
    static editBtn() {
      const editBtn = document.createElement("a");
      editBtn.href = "#edit";
      editBtn.classList.add("task-edit");
      editBtn.innerHTML = `<svg height="12" viewBox="0 -1 401.52289 401" width="12" xmlns="http://www.w3.org/2000/svg" id="fi_1159633"><path d="m370.589844 250.972656c-5.523438 0-10 4.476563-10 10v88.789063c-.019532 16.5625-13.4375 29.984375-30 30h-280.589844c-16.5625-.015625-29.980469-13.4375-30-30v-260.589844c.019531-16.558594 13.4375-29.980469 30-30h88.789062c5.523438 0 10-4.476563 10-10 0-5.519531-4.476562-10-10-10h-88.789062c-27.601562.03125-49.96875 22.398437-50 50v260.59375c.03125 27.601563 22.398438 49.96875 50 50h280.589844c27.601562-.03125 49.96875-22.398437 50-50v-88.792969c0-5.523437-4.476563-10-10-10zm0 0"></path><path d="m376.628906 13.441406c-17.574218-17.574218-46.066406-17.574218-63.640625 0l-178.40625 178.40625c-1.222656 1.222656-2.105469 2.738282-2.566406 4.402344l-23.460937 84.699219c-.964844 3.472656.015624 7.191406 2.5625 9.742187 2.550781 2.546875 6.269531 3.527344 9.742187 2.566406l84.699219-23.464843c1.664062-.460938 3.179687-1.34375 4.402344-2.566407l178.402343-178.410156c17.546875-17.585937 17.546875-46.054687 0-63.640625zm-220.257812 184.90625 146.011718-146.015625 47.089844 47.089844-146.015625 146.015625zm-9.40625 18.875 37.621094 37.625-52.039063 14.417969zm227.257812-142.546875-10.605468 10.605469-47.09375-47.09375 10.609374-10.605469c9.761719-9.761719 25.589844-9.761719 35.351563 0l11.738281 11.734375c9.746094 9.773438 9.746094 25.589844 0 35.359375zm0 0"></path></svg>`;
      return editBtn; // will be appended to div.task-controls
    }
    static completeBtn(task) {
      const completeBtn = document.createElement("a");
      completeBtn.href = "#complete";
      completeBtn.classList.add("task-complete");
      completeBtn.innerHTML = `<svg version="1.1" id="fi_709510" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><g><path d="M497.36,69.995c-7.532-7.545-19.753-7.558-27.285-0.032L238.582,300.845l-83.522-90.713c-7.217-7.834-19.419-8.342-27.266-1.126c-7.841,7.217-8.343,19.425-1.126,27.266l97.126,105.481c3.557,3.866,8.535,6.111,13.784,6.22c0.141,0.006,0.277,0.006,0.412,0.006c5.101,0,10.008-2.026,13.623-5.628L497.322,97.286C504.873,89.761,504.886,77.54,497.36,69.995z"></path></g></g><g><g><path d="M492.703,236.703c-10.658,0-19.296,8.638-19.296,19.297c0,119.883-97.524,217.407-217.407,217.407c-119.876,0-217.407-97.524-217.407-217.407c0-119.876,97.531-217.407,217.407-217.407c10.658,0,19.297-8.638,19.297-19.296C275.297,8.638,266.658,0,256,0C114.84,0,0,114.84,0,256c0,141.154,114.84,256,256,256c141.154,0,256-114.846,256-256C512,245.342,503.362,236.703,492.703,236.703z"></path></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>`
      if (task.done === true) {
        completeBtn.classList.toggle("task-uncomplete"); // ----- T O G G L E for icon bg red --
      }
      completeBtn.appendChild(this.iconUnCheck(task));
      return completeBtn; // will be appended to div.task-controls
    }
  
    // icon element in order to toggle between icon fa-check / fa-times
    static iconUnCheck(task) {
      const iconUnCheck = document.createElement("i");
      iconUnCheck.classList.add("fas");
      iconUnCheck.classList.add("fa-check");
      if (task.done === true) {
        iconUnCheck.classList.toggle("fa-times"); // ------------ T O G G L E to icon fa-times
      }
      return iconUnCheck;
    }
  }

