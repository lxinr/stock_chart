import Painter from 'src/Painter'
import G from 'models/G'

export default class Map {
  w: number
  h: number
  fr: HTMLElement
  el: HTMLCanvasElement
  C: CanvasRenderingContext2D
  dpr: number
  nodes: Array<any>
  mouse: any
  observerList: Array<G>
  focus: G
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
    this.el.style.width = '100%' // this.fr.offsetWidth + 'px'
    this.el.style.height = '100%' // this.fr.offsetHeight + 'px'
    this.fr.appendChild(this.el)
    this.C = this.el.getContext('2d')
    this.C.translate(.5, .5)
    this.C.imageSmoothingEnabled = true;
    this.C.scale(dpr, dpr)
    this.nodes = []
    this.observerList = []
    this.mouse = {}
    this.el.addEventListener('mousemove', () => { this.handleMousemove(event) })
  }
  render(clear: boolean = true) {
    const { nodes, C, w, h, view } = this
    clear && C.clearRect(view.x, view.y, w, h)
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
    if(obj.tag === 'G' && obj.w) this.observerList.push(obj)
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
  static getFocusNode(mouse: {x: number, y: number}, observerList: Array<G>) {
    let temp
    const { x, y} = mouse
    for(let i = 0; i < observerList.length; i++) {
      let _o = observerList[i]
      if(_o.left > x ) continue
      if(_o.left + _o.w < x ) continue
      if(_o.top > y ) continue
      if(_o.top + _o.h < y ) continue
      temp = _o
      break      
    }
    return temp
  }
  handleMousemove(e) {
    if (!e) return
    const { observerList } = this
    this.mouse.x = e.layerX
    this.mouse.y = e.layerY
    let focus = Map.getFocusNode(this.mouse, observerList)
    if(this.focus && focus !== this.focus) this.focus.onBlur()
    if(focus) {
      this.focus = focus
      focus.onFocus()
    } else {
      this.focus = null
    }
    this.render()
  }
}