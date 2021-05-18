import pubsub from "../pubsub";

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

  mainButtons.appendChild(deleteButton);
  mainButtons.appendChild(editButton);

  headerMain.appendChild(headerTitle);
  headerMain.appendChild(mainButtons);

  return headerMain;
}

export default createHeaderMain;
