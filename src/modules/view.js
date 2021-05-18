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

  const currentProject = {
    data: null,
    set(project) {
      this.data = project;
    },
    get() {
      return this.data;
    },
  };

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

  function currentProjectChanged(project) {
    currentProject.set(project);
    renderMain(project);
    nav.classList.toggle("navBarActive");
  }

  navBarButton.addEventListener("click", () => {
    nav.classList.toggle("navBarActive");
  });

  addProjectButton.addEventListener("click", () => {
    projectForm.classList.add("formActive");
  });

  pubsub.subscribe("todoDataChanged", render);
  pubsub.subscribe("currentProjectChanged", currentProjectChanged);
})();
