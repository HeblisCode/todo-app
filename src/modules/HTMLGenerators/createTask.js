import projectFactory from "../projectFactory";
import pubsub from "../pubsub";
import HMTLHelper from "./HTMLHelper";

function createEditForm(project, task) {
  const form = document.createElement("form");
  form.setAttribute("method", "dialog");

  const buttonContainer = document.createElement("div");
  buttonContainer.id = "taskButtons";

  const input = HMTLHelper.createInput({
    type: "text",
    required: "",
    name: "name",
    value: task.name,
  });

  const date = HMTLHelper.createInput({
    type: "date",
    required: "",
    name: "date",
    value: task.date,
  });

  const submitClick = () => {
    if (!input.checkValidity() || !date.checkValidity()) return;
    pubsub.publish("editTask", {
      project: project,
      taskId: task.id,
      name: input.value,
      date: date.value,
    });
  };

  const cancelClick = () => {
    pubsub.publish("editTask", {
      project: project,
      taskId: task.id,
      name: task.name,
      date: task.date,
    });
  };

  const submit = HMTLHelper.createMaterialButton("done", {
    click: submitClick,
  });

  const cancel = HMTLHelper.createMaterialButton("close", {
    click: cancelClick,
  });

  HMTLHelper.appendAll(buttonContainer, [submit, cancel]);
  HMTLHelper.appendAll(form, [input, date, buttonContainer]);

  return form;
}

function createTask(project, task) {
  const taskContainer = HMTLHelper.createDiv({ class: ["task"], id: task.id });
  const taskContent = HMTLHelper.createDiv({ class: ["taskContent"] });

  let completeIcon;

  if (task.isDone) {
    taskContainer.classList.add("taskCompleted");
    const incompleteTask = () => {
      pubsub.publish("incompleteTask", {
        projId: project.id,
        taskId: task.id,
      });
    };
    completeIcon = HMTLHelper.createMaterialButton("close", {
      click: incompleteTask,
    });
  } else {
    taskContainer.classList.remove("taskCompleted");
    const completeTask = () => {
      pubsub.publish("completeTask", {
        projId: project.id,
        taskId: task.id,
      });
    };
    completeIcon = HMTLHelper.createMaterialButton("done", {
      click: completeTask,
    });
  }

  const title = HMTLHelper.createParagraph({
    class: ["taskTitle"],
    text: task.name,
  });

  const date = HMTLHelper.createParagraph({
    class: ["taskDate"],
    text: task.date,
  });

  const deleteTaskListener = () => {
    pubsub.publish("deleteTask", { project: project, id: task.id });
  };

  const deleteIcon = HMTLHelper.createMaterialButton("delete", {
    click: deleteTaskListener,
  });

  taskContent.addEventListener("click", () => {
    pubsub.publish("requestTaskEdit", {
      taskId: task.id,
      form: createEditForm(project, task),
    });
  });

  HMTLHelper.appendAll(taskContent, [title, date]);
  HMTLHelper.appendAll(taskContainer, [completeIcon, taskContent, deleteIcon]);
  return taskContainer;
}

function createTaskMain(project) {
  const taskMain = document.createElement("div");
  const taskTitle = document.createElement("h3");
  const tasksContainer = document.createElement("div");
  const addButton = HMTLHelper.createMaterialButton("add", { click: addTask });

  taskMain.id = "mainTasks";
  taskTitle.innerText = "Tasks";
  tasksContainer.id = "tasksContainer";
  addButton.innerHTML = "add";
  addButton.classList.add("material-icons");

  tasksContainer.innerHTML = "";
  project.tasks.forEach((task) => {
    tasksContainer.appendChild(createTask(project, task));
  });

  function addTask() {
    pubsub.publish("addTask", project);
  }

  tasksContainer.appendChild(addButton);
  HMTLHelper.appendAll(taskMain, [taskTitle, tasksContainer]);

  return taskMain;
}

export default createTaskMain;
