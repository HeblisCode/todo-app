import createNavBarProject from "./HTMLGenerators/createNavBar";
import pubsub from "./pubsub";
const view = (function () {
  const navBarProjectContainer = document.querySelector(
    "#navProjectsContainer"
  );
  const mainContainer = document.querySelector("main");
  const tasksContainer = document.querySelector("#tasksContainer");

  const currentProject = {
    data: null,
    set(project) {
      this.data = project;
    },
    get() {
      return this.data;
    },
  };

  function currentProjectChanged(project) {
    currentProject.set(project);
    renderMain(project);
  }

  function renderNavBar(projects) {
    navBarProjectContainer.innerHTML = "";
    projects.forEach((project) => {
      const projectHTML = createNavBarProject(project, currentProject.get());
      navBarProjectContainer.appendChild(projectHTML);
    });
  }

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

  function createDescriptionMain(project) {
    const descriptionContainer = document.createElement("div");
    const descriptionTitle = document.createElement("h3");
    const descriptionPar = document.createElement("p");

    descriptionContainer.id = "mainDescription";
    descriptionTitle.innerText = "Description";
    descriptionPar.innerText = project.description;

    descriptionContainer.appendChild(descriptionTitle);
    descriptionContainer.appendChild(descriptionPar);

    return descriptionContainer;
  }

  function createHeaderMain(project) {
    const headerMain = document.createElement("div");
    const headerTitle = document.createElement("h2");
    const mainButtons = document.createElement("div");
    const deleteButton = document.createElement("span");
    const editButton = document.createElement("span");

    headerMain.id = "mainHeader";
    mainButtons.id = "mainButtons";
    deleteButton.classList.add("material-icons");
    editButton.classList.add("material-icons");

    headerTitle.innerText = project.title;
    deleteButton.innerText = "delete";
    editButton.innerText = "edit";

    mainButtons.appendChild(deleteButton);
    mainButtons.appendChild(editButton);

    headerMain.appendChild(headerTitle);
    headerMain.appendChild(mainButtons);

    return headerMain;
  }

  function renderMain(project) {
    if (!project) return;
    mainContainer.innerHTML = "";
    const headerMain = createHeaderMain(project);
    const descriptionMain = createDescriptionMain(project);
    const taskMain = createTaskMain(project);

    mainContainer.appendChild(headerMain);
    mainContainer.appendChild(descriptionMain);
    mainContainer.appendChild(taskMain);
  }

  function render(projects) {
    console.log(projects);
    renderNavBar(projects);
    renderMain(currentProject.get());
  }

  pubsub.subscribe("todoDataChanged", render);
  pubsub.subscribe("currentProjectChanged", currentProjectChanged);
})();
