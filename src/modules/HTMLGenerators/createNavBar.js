import pubsub from "../pubsub";

function removeActiveClass() {
  const activeProject = document.querySelector(".projectNavActive");
  if (activeProject === null) return;
  activeProject.classList.remove("projectNavActive");
}

function createNavBarProject(project, currentProject) {
  const projectContainer = document.createElement("div");
  const title = document.createElement("p");
  const deleteIcon = document.createElement("span");

  projectContainer.classList.add("projectNav");
  title.classList.add("projectNavTitle");
  deleteIcon.classList.add("material-icons");

  deleteIcon.addEventListener("click", () => {
    pubsub.publish("deleteProject", project.id);
  });

  if (!!currentProject && currentProject.id === project.id) {
    projectContainer.classList.add("projectNavActive");
  }

  projectContainer.addEventListener("click", () => {
    removeActiveClass();
    projectContainer.classList.add("projectNavActive");
    pubsub.publish("currentProjectChanged", project);
  });

  title.innerText = project.title;
  deleteIcon.innerText = "delete";

  projectContainer.id = project.id;
  projectContainer.appendChild(title);
  projectContainer.appendChild(deleteIcon);

  return projectContainer;
}

export default createNavBarProject;
