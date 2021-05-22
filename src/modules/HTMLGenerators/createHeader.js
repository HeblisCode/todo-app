import pubsub from "../pubsub";
import HTMLHelper from "./HTMLHelper";

function createEditForm(project) {
  const form = HTMLHelper.create("form", {
    method: "dialog",
  });

  const input = HTMLHelper.create("input", {
    type: "text",
    required: "",
    name: "title",
    value: project.title,
    maxlength: "30",
  });

  const submit = HTMLHelper.createMaterialButton("done", {
    click: submitClick,
  });

  const cancel = HTMLHelper.createMaterialButton("close", {
    click: cancelClick,
  });

  const buttonContainer = HTMLHelper.create("div", {
    id: "mainButtons",
  });

  function submitClick() {
    if (!input.checkValidity()) return;
    pubsub.publish("editProject", {
      projId: project.id,
      title: input.value,
      description: project.value,
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

function createHeaderMain(project) {
  const headerMain = HTMLHelper.create("div", {
    id: "mainHeader",
  });

  const headerTitle = HTMLHelper.create("h2");

  const mainButtons = HTMLHelper.create("div", {
    id: "mainButtons",
  });

  const editButton = HTMLHelper.createMaterialButton("edit", {
    click: editListener,
  });

  const deleteButton = HTMLHelper.createMaterialButton("delete", {
    click: deleteListener,
  });

  headerTitle.innerText = project.title;
  deleteButton.innerText = "delete";
  editButton.innerText = "edit";

  function editListener() {
    pubsub.publish("requestTitleEdit", createEditForm(project));
  }

  function deleteListener() {
    pubsub.publish("currentProjectChanged", null);
    pubsub.publish("deleteProject", project.id);
  }

  HTMLHelper.appendAll(mainButtons, [editButton, deleteButton]);
  HTMLHelper.appendAll(headerMain, [headerTitle, mainButtons]);

  return headerMain;
}

export default createHeaderMain;
