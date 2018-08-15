import vNode from 'src/VNode'
import Painter from 'src/Painter'

interface text {
  left?: number
  top?: number
  textAlign?: string
  text: string
  c?:string|CanvasGradient
  fontSize?: number
}

const tag = 'TEXT'

export default class Text extends vNode {
  left: number = 10
  top: number = 10
  textAlign: string = 'center'
  text: string
  c: string|CanvasGradient = '#fff'
  font: string = '12px "宋体"'
  baseLine: string = 'middle'
  constructor(obj: text = {text: ''}) {
    super(tag)
    for(let x in obj) {
      this[x] = obj[x]
    }    
  }
}

Painter.reg(tag, function(node: Text) {
  const { left, top, textAlign, c, font } = node
  this.textAlign = textAlign
  this.fillStyle = c
  this.font = font
  this.fillText(node.text, left, top)
})