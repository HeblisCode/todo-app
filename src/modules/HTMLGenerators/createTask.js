import pubsub from "../pubsub";

function createEditForm(project, task) {
  const form = document.createElement("form");
  const input = document.createElement("input");
  const date = document.createElement("input");
  const submit = document.createElement("span");
  const cancel = document.createElement("span");

  input.setAttribute("type", "text");
  input.setAttribute("required", "");
  input.setAttribute("name", "name");
  input.setAttribute("value", task.name);
  date.setAttribute("type", "date");
  date.setAttribute("required", "");
  date.setAttribute("name", "date");
  date.setAttribute("value", task.date);
  form.setAttribute("method", "dialog");

  submit.classList.add("material-icons");
  cancel.classList.add("material-icons");
  submit.innerText = "done";
  cancel.innerText = "cancel";

  submit.addEventListener("click", () => {
    if (!input.checkValidity() || !date.checkValidity()) return;
    pubsub.publish("editTask", {
      project: project,
      taskId: task.id,
      name: input.value,
      date: date.value,
    });
  });

  cancel.addEventListener("click", () => {
    pubsub.publish("editTask", {
      project: project,
      taskId: task.id,
      name: task.name,
      date: task.date,
    });
  });

  form.appendChild(input);
  form.appendChild(date);
  form.appendChild(submit);
  form.appendChild(cancel);

  return form;
}

function createTask(project, task) {
  const taskContainer = document.createElement("div");
  const taskContent = document.createElement("div");
  const title = document.createElement("p");
  const date = document.createElement("p");
  const deleteIcon = document.createElement("span");
  const completeIcon = document.createElement("span");

  taskContainer.classList.add("task");
  taskContainer.id = task.id;
  taskContent.classList.add("taskContent");
  title.classList.add("taskTitle");
  date.classList.add("taskDate");
  deleteIcon.classList.add("material-icons");
  completeIcon.classList.add("material-icons");

  if (task.isDone) {
    taskContainer.classList.add("taskCompleted");
    completeIcon.innerText = "close";
    completeIcon.addEventListener("click", () => {
      pubsub.publish("incompleteTask", {
        projId: project.id,
        taskId: task.id,
      });
    });
  } else {
    completeIcon.innerText = "done";
    taskContainer.classList.remove("taskCompleted");
    completeIcon.addEventListener("click", () => {
      pubsub.publish("completeTask", {
        projId: project.id,
        taskId: task.id,
      });
    });
  }

  deleteIcon.addEventListener("click", () => {
    pubsub.publish("deleteTask", { project: project, id: task.id });
  });

  title.innerText = task.name;
  date.innerText = task.date;
  deleteIcon.innerText = "delete";

  taskContent.addEventListener("click", () => {
    pubsub.publish("requestTaskEdit", {
      taskId: task.id,
      form: createEditForm(project, task),
    });
  });

  taskContent.appendChild(title);
  taskContent.appendChild(date);
  taskContainer.appendChild(completeIcon);
  taskContainer.appendChild(taskContent);
  taskContainer.appendChild(deleteIcon);

  return taskContainer;
}

function createTaskMain(project) {
  const taskMain = document.createElement("div");
  const taskTitle = document.createElement("h3");
  const tasksContainer = document.createElement("div");

  taskMain.id = "mainTasks";
  taskTitle.innerText = "Tasks";
  tasksContainer.id = "tasksContainer";

  tasksContainer.classList.add("taskContainer");
  tasksContainer.innerHTML = "";
  project.tasks.forEach((task) => {
    tasksContainer.appendChild(createTask(project, task));
  });

  taskMain.appendChild(taskTitle);
  taskMain.appendChild(tasksContainer);

  return taskMain;
}

export default createTaskMain;
