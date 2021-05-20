import pubsub from "../pubsub";
import HTMLHelper from "./HTMLHelper";

function createEditForm(project) {
  const form = HTMLHelper.create("form", {
    method: "dialog",
  });

  const input = HTMLHelper.create("textarea", {
    placeholder: "Write your description here!",
  });
  input.innerText = project.description;

  const submit = HTMLHelper.createMaterialButton("done", {
    click: submitClick,
  });

  const cancel = HTMLHelper.createMaterialButton("close", {
    click: cancelClick,
  });

  const buttonContainer = HTMLHelper.create("div", {
    id: "descButtons",
  });

  function submitClick() {
    pubsub.publish("editProject", {
      projId: project.id,
      title: project.title,
      description: input.value,
      priority: project.value,
    });
  }

  function cancelClick() {
    pubsub.publish("editProject", {
      projId: project.id,
      title: project.title,
      description: project.description,
      priority: project.value,
    });
  }

  HTMLHelper.appendAll(buttonContainer, [submit, cancel]);
  HTMLHelper.appendAll(form, [input, buttonContainer]);

  return form;
}

function createDescriptionMain(project) {
  const descriptionContainer = HTMLHelper.create("div", {
    id: "mainDescription",
  });

  const descriptionTitle = document.createElement("h3");
  descriptionTitle.innerText = "Description";

  const descriptionPar = document.createElement("p");
  if (project.description === "") {
    descriptionPar.innerText = "Write your description here!";
  } else {
    descriptionPar.innerText = project.description;
  }
  descriptionPar.addEventListener("click", () => {
    pubsub.publish("requestDescriptionEdit", createEditForm(project));
  });

  HTMLHelper.appendAll(descriptionContainer, [
    descriptionTitle,
    descriptionPar,
  ]);

  return descriptionContainer;
}

export default createDescriptionMain;
