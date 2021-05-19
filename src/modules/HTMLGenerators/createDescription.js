import projectFactory from "../projectFactory";
import pubsub from "../pubsub";

function createEditForm(project) {
  const form = document.createElement("form");
  const input = document.createElement("textarea");
  const submit = document.createElement("span");
  const cancel = document.createElement("span");

  input.setAttribute("type", "text");
  input.innerText = project.description;
  form.setAttribute("method", "dialog");

  submit.classList.add("material-icons");
  cancel.classList.add("material-icons");
  submit.innerText = "done";
  cancel.innerText = "cancel";

  submit.addEventListener("click", () => {
    pubsub.publish("editProject", {
      projId: project.id,
      title: project.title,
      description: input.value,
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

  form.appendChild(input);
  form.appendChild(submit);
  form.appendChild(cancel);

  return form;
}

function createDescriptionMain(project) {
  const descriptionContainer = document.createElement("div");
  const descriptionTitle = document.createElement("h3");
  const descriptionPar = document.createElement("p");

  descriptionContainer.id = "mainDescription";
  descriptionTitle.innerText = "Description";
  if (project.description === "") {
    descriptionPar.innerText = "Write your description here!";
  } else {
    descriptionPar.innerText = project.description;
  }
  descriptionPar.addEventListener("click", () => {
    pubsub.publish("requestDescriptionEdit", createEditForm(project));
  });

  descriptionContainer.appendChild(descriptionTitle);
  descriptionContainer.appendChild(descriptionPar);

  return descriptionContainer;
}

export default createDescriptionMain;
