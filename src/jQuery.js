window.jQuery = function (selectorOrArrayOrTemplate) {
  let elements
  if (typeof selectorOrArrayOrTemplate === 'string') {
    if (selectorOrArrayOrTemplate[0] === '<') {
      elements = [createElement(selectorOrArrayOrTemplate)]
    } else {
      elements = document.querySelectorAll(selectorOrArrayOrTemplate)
    }
  } else if (selectorOrArrayOrTemplate instanceof Array) {
    elements = selectorOrArrayOrTemplate
  }
  const api = Object.create(jQuery.prototype)
  return Object.assign(api, {
    elements: elements,
    oldApi: selectorOrArrayOrTemplate.oldApi,
  })
}

jQuery.prototype = {
  createElement(string) {
    const container = document.createElement('template')
    container.innerHTML = string
    return container.content.firstChild
  },
  get(index) {
    return this.elements[index]
  },
  addClass(className) {
    this.each((e) => {
      e.classList.add(className)
    })
    return this
  },
  find(selector) {
    let array = []
    this.each((e) => {
      array = array.concat(Array.from(e.querySelectorAll(selector)))
    })
    array.oldApi = this
    return jQuery(array)
  },
  end() {
    return this.oldApi
  },
  each(fn) {
    this.elements.forEach((e, index) => {
      fn.call(null, e, index)
    })
    return this
  },
  children() {
    let arr = []
    this.each((div) => {
      arr.push(...div.children)
    })
    return jQuery(arr)
  },
  parent() {
    let arr = []
    this.each((div) => {
      if (arr.indexOf(div.parentNode) === -1) {
        arr.push(div.parentNode)
      }
    })
    return jQuery(arr)
  },
  print() {
    console.log(this.elements)
  },
}
window.$ = window.jQuery

// $('#test').find('.child').addClass('red') // 请确保这句话成功执行

$('#test').find('.child').addClass('red').end().addClass('whiteText')
