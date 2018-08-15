import vNode from 'src/VNode'
import Painter from 'src/Painter'
interface g {
  left?: number
  top?: number
  w?: number
  h?: number
  deg?: number
}
export default class G extends vNode{
  left:number = 0
  top: number = 0
  w: number = 0
  h: number = 0
  deg:number = 0
  center: [number, number] = [0, 0]
  children: Array<vNode>
  constructor(obj:g = {}) {
    super('G')
    for(let x in obj) {
      this[x] = obj[x]
    }    
    this.children = []
  }
  add(vNode) {
    this.children.push(vNode)
  }
  remove(obj: any) {
    let i = this.children.indexOf(obj)
    this.children.splice(i, 1)
  }  
}

Painter.reg('G', function(node: G){
  const { children, center, deg, w, h, left, top } = node
  if(w && h) {
    this.beginPath()
    this.rect(left, top, w, h)
    this.clip()
  }
  this.beginPath()
  this.translate(...center)
  this.rotate(deg * Math.PI / 180)
  this.translate(-center[0], -center[1])
  const self = this
  for(let x in children) {
    Painter.draw(self, children[x].tag, children[x])
  }
  this.rotate(-deg * Math.PI / 180)
})