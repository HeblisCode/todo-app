import createNavBarProject from "./HTMLGenerators/createNavBar";
import createTaskMain from "./HTMLGenerators/createTask";
import createDescriptionMain from "./HTMLGenerators/createDescription";
import createHeaderMain from "./HTMLGenerators/createHeader";
import pubsub from "./pubsub";
import HTMLHelper from "./HTMLGenerators/HTMLHelper";

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
    console.log(currentProject.get());
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
    mainContainer.innerHTML = "";
    if (!project) return;
    HTMLHelper.appendAll(mainContainer, [
      createHeaderMain(project),
      createDescriptionMain(project),
      createTaskMain(project),
    ]);
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
    addProjectButton.style.display = "none";
  });

  //add project form
  const input = document.querySelector("nav > form > input");
  const confirm = document.querySelector("#projFormButtons > .confirm");
  const cancel = document.querySelector("#projFormButtons > .cancel");

  confirm.addEventListener("mousedown", () => {
    pubsub.publish("addProject", input.value);
    projectForm.reset();
    projectForm.classList.remove("formActive");
    addProjectButton.style.display = "block";
  });

  cancel.addEventListener("click", (e) => {
    e.preventDefault();
    projectForm.reset();
    projectForm.classList.remove("formActive");
    addProjectButton.style.display = "block";
  });

  //pubsub calls
  pubsub.subscribeAll({
    todoDataChanged: render,
    currentProjectChanged: currentProjectChanged,
    requestDescriptionEdit: editDescription,
    requestTitleEdit: editTitle,
    requestTaskEdit: editTask,
  });
})();
