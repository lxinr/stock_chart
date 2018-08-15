import vNode from 'src/VNode'
import Painter from 'src/Painter'

interface lines {
  pointers: Array<[number, number]>
  w?: number
  c?: string
  bezier?: boolean
}
/* 线段集合 */
export default class Lines extends vNode {
  pointers: Array<[number, number]>
  c: string
  w: number = 1
  bezier: boolean = false
  constructor(obj: lines) {
    super('LINES')
    for(let x in obj) {
      this[x] = obj[x]
    }    
  }
}

Painter.reg('LINES', function(Lines){
  const { pointers, c = '#ff0', w = 1, bezier } = Lines
  if(bezier) {
    this.moveTo(...pointers[0])
    for(let x = 1; x < pointers.length; x++) {
      let dX = (pointers[x][0] - pointers[x-1][0]) * .75
      this.bezierCurveTo(pointers[x-1][0] + dX, pointers[x-1][1], pointers[x][0] - dX, pointers[x][1], ...pointers[x])
    }
  } else {
    for(let x in pointers) {
      this.lineTo(...pointers[x])
    }
  }
  this.lineWidth  = w
  this.strokeStyle = c
  this.stroke()
})

