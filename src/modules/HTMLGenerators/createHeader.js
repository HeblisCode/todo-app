import projectFactory from "../projectFactory";
import pubsub from "../pubsub";
import HMTLHelper from "./HTMLHelper";

function createEditForm(project) {
  const form = document.createElement("form");
  const input = document.createElement("input");
  const submit = document.createElement("span");
  const cancel = document.createElement("span");
  const buttonContainer = document.createElement("div");
  buttonContainer.id = "mainButtons";

  input.setAttribute("type", "text");
  input.setAttribute("required", "");
  input.setAttribute("name", "title");
  input.setAttribute("value", project.title);
  form.setAttribute("method", "dialog");

  submit.classList.add("material-icons");
  cancel.classList.add("material-icons");
  submit.innerText = "done";
  cancel.innerText = "close";

  submit.addEventListener("click", () => {
    if (!input.checkValidity()) return;
    pubsub.publish("editProject", {
      projId: project.id,
      title: input.value,
      description: project.value,
      priority: project.value,
    });
  });

  cancel.addEventListener("click", () => {
    pubsub.publish("editProject", {
      projId: project.id,
      title: project.title,
      description: project.description,
      priority: project.value,
    });
  });

  HMTLHelper.appendAll(buttonContainer, [submit, cancel]);
  HMTLHelper.appendAll(form, [input, buttonContainer]);

  return form;
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

  editButton.addEventListener("click", () => {
    pubsub.publish("requestTitleEdit", createEditForm(project));
  });

  deleteButton.addEventListener("click", () => {
    pubsub.publish("deleteProject", project.id);
  });

  mainButtons.appendChild(deleteButton);
  mainButtons.appendChild(editButton);

  headerMain.appendChild(headerTitle);
  headerMain.appendChild(mainButtons);

  return headerMain;
}

export default createHeaderMain;
