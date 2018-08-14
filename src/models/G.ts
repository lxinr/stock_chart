import vNode from 'src/VNode'
import Painter from 'src/Painter'

export default class G extends vNode{
  deg:number = 0
  center: [number, number]
  children: Array<vNode>
  constructor() {
    super('G')
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
  const { children, center, deg } = node
  this.translate(...center)
  this.rotate(deg * Math.PI / 180)
  this.translate(-center[0], -center[1])
  const self = this
  for(let x in children) {
    Painter.draw(self, children[x].tag, children[x])
  }
  this.rotate(-deg * Math.PI / 180)
})