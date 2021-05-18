import pubsub from "../pubsub";

function createDescriptionMain(project) {
  const descriptionContainer = document.createElement("div");
  const descriptionTitle = document.createElement("h3");
  const descriptionPar = document.createElement("p");

  descriptionContainer.id = "mainDescription";
  descriptionTitle.innerText = "Description";
  descriptionPar.innerText = project.description;

  descriptionContainer.appendChild(descriptionTitle);
  descriptionContainer.appendChild(descriptionPar);

  return descriptionContainer;
}

export default createDescriptionMain;
