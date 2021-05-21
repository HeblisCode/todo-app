import { format, formatDistance } from "date-fns";
import pubsub from "../pubsub";
import HTMLHelper from "./HTMLHelper";

function createEditForm(project, task) {
  const form = HTMLHelper.create("form", {
    method: "dialog",
  });

  const buttonContainer = HTMLHelper.create("div", {
    id: "taskButtons",
  });

  const submit = HTMLHelper.createMaterialButton("done", {
    click: submitClick,
  });

  const cancel = HTMLHelper.createMaterialButton("close", {
    click: cancelClick,
  });

  const input = HTMLHelper.create("input", {
    type: "text",
    required: "",
    name: "name",
    value: task.name,
  });

  const date = HTMLHelper.create("input", {
    type: "date",
    required: "",
    name: "date",
    value: task.date,
  });

  function submitClick() {
    if (!input.checkValidity() || !date.checkValidity()) return;
    pubsub.publish("editTask", {
      project: project,
      taskId: task.id,
      name: input.value,
      date: date.value,
    });
  }

  function cancelClick() {
    pubsub.publish("editTask", {
      project: project,
      taskId: task.id,
      name: task.name,
      date: task.date,
    });
  }

  HTMLHelper.appendAll(buttonContainer, [submit, cancel]);
  HTMLHelper.appendAll(form, [input, date, buttonContainer]);

  return form;
}

function createTask(project, task) {
  const taskContainer = HTMLHelper.create("div", {
    class: "task",
    id: task.id,
  });
  const taskContent = HTMLHelper.create("div", {
    class: "taskContent",
  });

  let completeButton;

  if (task.isDone) {
    taskContainer.classList.add("taskCompleted");
    const incompleteTask = () => {
      pubsub.publish("incompleteTask", {
        projId: project.id,
        taskId: task.id,
      });
    };
    completeButton = HTMLHelper.createMaterialButton("close", {
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
    completeButton = HTMLHelper.createMaterialButton("done", {
      click: completeTask,
    });
  }

  const deleteButton = HTMLHelper.createMaterialButton("delete", {
    click: deleteTaskListener,
  });

  const title = HTMLHelper.create("p", {
    class: "taskTitle",
  });
  title.innerText = task.name;

  const date = HTMLHelper.create("p", {
    class: "taskDate",
  });
  date.innerText = formatDistance(new Date(task.date), new Date(), {
    addSuffix: true,
  });

  function deleteTaskListener() {
    pubsub.publish("deleteTask", { project: project, id: task.id });
  }

  taskContent.addEventListener("click", () => {
    pubsub.publish("requestTaskEdit", {
      taskId: task.id,
      form: createEditForm(project, task),
    });
  });

  HTMLHelper.appendAll(taskContent, [title, date]);
  HTMLHelper.appendAll(taskContainer, [
    completeButton,
    taskContent,
    deleteButton,
  ]);
  return taskContainer;
}

function createTaskMain(project) {
  const taskMain = HTMLHelper.create("div", {
    id: "mainTasks",
  });

  const taskTitle = document.createElement("h3");

  const tasksContainer = HTMLHelper.create("div", {
    id: "tasksContainer",
  });

  const addButton = HTMLHelper.createMaterialButton("add", {
    click: addTask,
  });

  taskTitle.innerText = "Tasks";

  project.tasks.forEach((task) => {
    tasksContainer.appendChild(createTask(project, task));
  });

  function addTask() {
    pubsub.publish("addTask", project);
  }

  tasksContainer.appendChild(addButton);
  HTMLHelper.appendAll(taskMain, [taskTitle, tasksContainer]);

  return taskMain;
}

export default createTaskMain;
