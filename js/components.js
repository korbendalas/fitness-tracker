function createElement(elType, elText, elClass) {
    let element = document.createElement(elType);
    let elementText = document.createTextNode(elText);
    if (elText) {
        element.appendChild(elementText)
    }
    if (elClass) {
        element.classList.add(elClass)
    }
    return element;
}