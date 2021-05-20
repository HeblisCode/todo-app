import pubsub from "../pubsub";
import HTMLHelper from "./HTMLHelper";

function removeActiveClass() {
  const activeProject = document.querySelector(".projectNavActive");
  if (activeProject === null) return;
  activeProject.classList.remove("projectNavActive");
}

function createNavBarProject(project, currentProject) {
  const projectContainer = HTMLHelper.create("div", {
    id: project.id,
    class: "projectNav",
  });

  const title = HTMLHelper.create("p", {
    class: "projectNavTitle",
  });

  const deleteButton = HTMLHelper.createMaterialButton("delete", {
    click: deleteButtonClick,
  });

  function deleteButtonClick() {
    pubsub.publish("deleteProject", project.id);
  }

  function projectClick() {
    removeActiveClass();
    projectContainer.classList.add("projectNavActive");
    pubsub.publish("currentProjectChanged", project);
  }

  if (!!currentProject && currentProject.id === project.id) {
    projectContainer.classList.add("projectNavActive");
  }
  projectContainer.addEventListener("click", projectClick);

  title.innerText = project.title;

  HTMLHelper.appendAll(projectContainer, [title, deleteButton]);

  return projectContainer;
}

export default createNavBarProject;
