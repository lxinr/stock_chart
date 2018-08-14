import vNode from 'src/VNode'
import Painter from 'src/Painter'

interface lines {
  pointers: Array<[number, number]>
  w?: number
  c?: string
}
/* 线段集合 */
export default class Lines extends vNode {
  pointers: Array<[number, number]>
  c: string  
  constructor(obj: lines) {
    super('LINES')
    for(let x in obj) {
      this[x] = obj[x]
    }    
  }
}

Painter.reg('LINES', function(Lines){
  const { pointers, c = '#ff0', w = 1 } = Lines
  for(let x in pointers) {
    this.lineTo(...pointers[x])
  }
  this.lineWidth  = w
  this.strokeStyle = c
  this.stroke()
})

