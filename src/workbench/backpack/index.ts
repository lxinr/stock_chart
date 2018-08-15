function bindStyle(obj: any, style: any) {
  for(let x in style) {
    obj.style[x] = style[x]
  }
}

class Bag {
  el: HTMLDivElement
  children: Array<any>
  isShow: boolean = false
  constructor() {
    this.el = document.createElement('div')
    this.children = []
    this.style = {
      "width": '200px',
      "box-shadow": '0 0 8px #888',
      "background-color": "rgba(0, 0, 0, .5)"
    }
  }
  show() {
    !this.isShow && document.body.appendChild(this.el)
    this.isShow = true
  }
  close() {
    this.isShow && document.body.removeChild(this.el)
    this.isShow = false
  }
  toggle() {
    this.isShow ? this.close() : this.show()
  }
  get style(): any{
    return this.el.style
  }
  set style(obj: any) {
    const { el } = this
    bindStyle(el, obj)
  }
  append(node: any) {
    this.children.push(node)
  } 
}


let bag = new Bag()

export default bag