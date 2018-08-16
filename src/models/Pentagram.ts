import vNode from 'src/VNode'
import Painter from 'src/Painter'
import Line from 'models/Line'
import Lines from 'models/Lines'
import G from 'models/G';
import Text from 'models/Text'
import Polygon from 'models/Polygon'

const tag = 'PENTA_GRAM'

interface pentagram {
  size: number
  left?: number
  top?: number  
}

export default class Pentagram extends vNode {
  size: number = 100
  left: number = 0
  top: number = 0
  polygon: Polygon
  constructor(obj: pentagram) {
    super(tag)
    for(let x in obj) {
      this[x] = obj[x]
    }
    this.makePolygon()
  }
  makePolygon() {
    const { left = 0, top = 0, size} = this
    let perDeg = 360 / 5
    let r = size / 2
    let ps_1 = Array.apply(null, {length: 5}).map((Item, index) => {
      let deg = index * perDeg - 90
      let _x = Math.cos( deg * Math.PI / 180 ) * r + size / 2
      let _y = Math.sin( deg * Math.PI / 180) * r + size / 2
      return [_x, _y]
    })
    let ps_2 = Array.apply(null, {length: 5}).map((Item, index) => {
      let deg = index * perDeg + 90 + 72 * 3
      let _x = Math.cos( deg * Math.PI / 180 ) * .4 * r + size / 2
      let _y = Math.sin( deg * Math.PI / 180) * .4 * r  + size / 2
      return [_x, _y]
    })
    let x = []
    for(let i = 0; i<5; i++) {
      x.push(ps_1[i], ps_2[i])
    }
    let p_1 = new Polygon({
      pointers: x,
      c: '#f00',
      fill: true,
      fillStyle: 'rgba(222, 222, 0, .75)'
    })
    this.polygon = p_1
  }
}

Painter.reg(tag, function(node: Pentagram) {
  const { left = 0, top = 0, polygon} = node
  const _self = this
  let g = new G({
    left,
    top
  })
  g.add(polygon)
  Painter.draw(_self, 'G', g)
})