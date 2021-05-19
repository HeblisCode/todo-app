import createNavBarProject from "./HTMLGenerators/createNavBar";
import createTaskMain from "./HTMLGenerators/createTask";
import createDescriptionMain from "./HTMLGenerators/createDescription";
import createHeaderMain from "./HTMLGenerators/createHeader";
import pubsub from "./pubsub";

const view = (function () {
  const nav = document.querySelector("nav");
  const navBarContainer = document.querySelector("#navProjectsContainer");
  const mainContainer = document.querySelector("main");
  const navBarButton = document.querySelector("header > button");
  const addProjectButton = document.querySelector("#addProject");
  const projectForm = document.querySelector("nav > form");

  //current project
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
    nav.classList.toggle("navBarActive");
  }

  //Rendering Functions
  function renderNavBar(projects) {
    navBarContainer.innerHTML = "";
    projects.forEach((project) => {
      const projectHTML = createNavBarProject(project, currentProject.get());
      navBarContainer.appendChild(projectHTML);
    });
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
    renderNavBar(projects);
    renderMain(currentProject.get());
  }

  //Edit Functions
  function editDescription(form) {
    const descriptionContainer = document.querySelector("#mainDescription");
    const descriptionPar = descriptionContainer.querySelector("p");
    descriptionPar.remove();
    descriptionContainer.appendChild(form);
  }
  function editTitle(form) {
    const headerContainer = document.querySelector("#mainHeader");
    headerContainer.innerHTML = "";
    headerContainer.appendChild(form);
  }
  function editTask(obj) {
    const taskContainer = document.querySelector(`#${obj.taskId}`);
    taskContainer.innerHTML = "";
    taskContainer.appendChild(obj.form);
  }

  //event listeners
  navBarButton.addEventListener("click", () => {
    nav.classList.toggle("navBarActive");
  });
  addProjectButton.addEventListener("click", () => {
    projectForm.classList.add("formActive");
  });

  //add project form
  const input = document.querySelector("nav > form > input");
  const confirm = document.querySelector("#projFormButtons > .confirm");
  const cancel = document.querySelector("#projFormButtons > .cancel");

  confirm.addEventListener("mousedown", () => {
    pubsub.publish("addProject", input.value);
    projectForm.reset();
    projectForm.classList.remove("formActive");
  });

  cancel.addEventListener("click", () => {
    projectForm.classList.remove("formActive");
  });

  //pubsub calls
  pubsub.subscribe("todoDataChanged", render);
  pubsub.subscribe("currentProjectChanged", currentProjectChanged);
  pubsub.subscribe("requestDescriptionEdit", editDescription);
  pubsub.subscribe("requestTitleEdit", editTitle);
  pubsub.subscribe("requestTaskEdit", editTask);
})();
