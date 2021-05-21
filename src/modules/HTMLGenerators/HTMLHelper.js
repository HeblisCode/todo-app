const HTMLHelper = (function () {
  //obj = {type: eventListener}
  function createMaterialButton(figure, obj) {
    const button = document.createElement("span");
    button.classList.add("material-icons");
    button.classList.add("material-button");
    button.innerText = figure;
    if (obj === undefined) return button;
    for (let key in obj) {
      button.addEventListener(key, obj[key]);
    }
    return button;
  }

  function appendAll(target, array) {
    array.forEach((element) => {
      target.appendChild(element);
    });
  }

  function create(type, attributes) {
    const element = document.createElement(type);
    if (attributes === undefined) return element;
    for (let key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
    return element;
  }

  return {
    createMaterialButton,
    appendAll,
    create,
  };
})();

export default HTMLHelper;
