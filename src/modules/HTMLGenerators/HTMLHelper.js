const HMTLHelper = (function () {
  //obj = {type: eventListener}
  function createMaterialButton(figure, obj) {
    const button = document.createElement("span");
    button.classList.add("material-icons");
    button.innerText = figure;
    if (obj === undefined) return button;
    for (let key in obj) {
      console.log(key);
      console.log(obj[key]);
      button.addEventListener(key, obj[key]);
    }
    return button;
  }

  function appendAll(target, array) {
    array.forEach((element) => {
      target.appendChild(element);
    });
  }

  //obj = {attributeName: attributeValue}
  function createInput(obj) {
    const input = document.createElement("input");
    for (let key in obj) {
      input.setAttribute(key, obj[key]);
    }
    return input;
  }

  function createParagraph(obj) {
    const paragraph = document.createElement("p");
    paragraph.id = obj.id;
    paragraph.innerText = obj.text;
    if (obj.class === undefined) return paragraph;
    obj.class.forEach((element) => {
      paragraph.classList.add(element);
    });
    return paragraph;
  }

  function createDiv(obj) {
    const div = document.createElement("div");
    div.id = obj.id;
    if (obj.class === undefined) return div;
    obj.class.forEach((element) => {
      div.classList.add(element);
    });
    return div;
  }

  return {
    createMaterialButton,
    appendAll,
    createInput,
    createParagraph,
    createDiv,
  };
})();
export default HMTLHelper;
