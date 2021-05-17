import pubsub from "./pubsub";
const view = (function () {
  const navBarProjectContainer = document.querySelector(
    "#navProjectsContainer"
  );

  function renderNavBarProject(project) {
    const projectContainer = document.createElement("div");
    const title = document.createElement("p");
    const deleteIcon = document.createElement("span");

    projectContainer.classList.add("projectNav");
    title.classList.add("projectNavTitle");
    deleteIcon.classList.add("material-icons");

    deleteIcon.addEventListener("click", (e) => console.log(e));

    title.innerText = project.title;
    deleteIcon.innerText = "delete";

    projectContainer.appendChild(title);
    projectContainer.appendChild(deleteIcon);

    return projectContainer;
  }

  function renderNavBar(projects) {
    projects.forEach((project) => {
      const projectHTML = renderNavBarProject(project);
      navBarProjectContainer.appendChild(projectHTML);
    });
  }

  pubsub.subscribe("todoDataChanged", renderNavBar);
})();

export default view;
