import pubsub from "../pubsub";

function createTask(project, task) {
  const taskContainer = document.createElement("div");
  const taskContent = document.createElement("div");
  const title = document.createElement("p");
  const date = document.createElement("p");
  const deleteIcon = document.createElement("span");
  const completeIcon = document.createElement("span");

  taskContainer.classList.add("task");
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
