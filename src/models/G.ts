import vNode from 'src/VNode'
import Painter from 'src/Painter'
interface g {
  left?: number
  top?: number
  w?: number
  h?: number
  deg?: number
  clip?: boolean
  c?: string
  onFocus?: Function
}
/**
 * 容器
 * @constructor 
 */
export default class G extends vNode{
  left:number = 0
  top: number = 0
  w: number = 0
  h: number = 0
  deg:number = 0
  center: [number, number] = [0, 0]
  children: Array<vNode>
  c: string
  _c: string
  clip: boolean = false
  constructor(obj:g = {}) {
    super('G')
    for(let x in obj) {
      this[x] = obj[x]
    }
    this._c = obj.c || 'rgba(0, 0, 0, .1)'
    this.children = []
  }
  add(vNode) {
    this.children.push(vNode)
  }
  remove(obj: any) {
    let i = this.children.indexOf(obj)
    this.children.splice(i, 1)
  }
  onFocus() {
    this.c = '#ff0'
  }
  onBlur() {
    this.c = this._c
  }
}

Painter.reg('G', function(node: G){
  const { children, center, deg, w, h, left, top, c = 'rgba(0, 0, 0, .1)', clip } = node
  if(clip && w && h) {
    this.beginPath()
    this.rect(left, top, w, h)
    this.clip()
  }
  this.beginPath()
  this.translate(...center)
  this.rotate(deg * Math.PI / 180)
  this.translate(-center[0] + left, -center[1] + top)
  this.rect(0, 0, w, h)
  // this.fillStyle = c
  // this.fill()
  const self = this
  for(let x in children) {
    Painter.draw(self, children[x].tag, children[x])
  }
  this.translate(-left, -top)
  this.rotate(-deg * Math.PI / 180)
})