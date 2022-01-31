class DomManipulate {
  render(data, selector) {
    const domElement = document.querySelector(selector)
    domElement.innerHTML = ''
    domElement.appendChild(data)
  }
}
