import Painter from 'src/Painter'

export default class Map {
  w: number
  h: number
  fr: HTMLElement
  el: HTMLCanvasElement
  C: CanvasRenderingContext2D
  dpr: number
  nodes: Array<any>
  mouse: any
  view: {
    x: 0,
    y: 0,
    w: number,
    h: number
  }
  constructor(id: string, dpr: number = 1) {
    this.fr = document.getElementById(id)
    this.el = document.createElement('canvas')
    this.view = {
      x: 0,
      y: 0,
      w: this.fr.offsetWidth,
      h: this.fr.offsetHeight
    }
    this.el.width = this.fr.offsetWidth * dpr
    this.w = this.fr.offsetWidth
    this.el.height = this.fr.offsetHeight * dpr
    this.h = this.fr.offsetHeight
    this.dpr = dpr
    this.el.style.width = this.fr.offsetWidth + 'px'
    this.el.style.height = this.fr.offsetHeight + 'px'
    this.fr.appendChild(this.el)
    this.C = this.el.getContext('2d')
    this.C.imageSmoothingEnabled = true;
    this.C.scale(dpr, dpr)
    this.nodes = []
    this.mouse = {}
    this.el.addEventListener('mousemove', () => { this.handleMousemove(event) })
  }
  render() {
    const { nodes, C, w, h, view } = this
    C.clearRect(view.x, view.y, w, h)
    for(let node of nodes) {
      Painter.draw(C, node.tag, node)
    }
   
  }
  viewMove(x: number, y: number) {
    this.view.x += x
    this.view.y += y
    this.C.translate(-x, -y)
  }
  add(obj: any) {
    this.nodes.push(obj)
  }
  remove(obj: any) {
    let i = this.nodes.indexOf(obj)
    this.nodes.splice(i, 1)
  }
  clear() {
    const { C, w, h, view } = this
    C.clearRect(view.x, view.y, w, h)
    this.C.translate(view.x, view.y)
    this.nodes = []
    this.view.x = 0
    this.view.y = 0
  }
  handleMousemove(e) {
    if (!e) return
    this.mouse.x = e.layerX
    this.mouse.y = e.layerY
  }
}