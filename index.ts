import Map from 'src/Map'
import PolyCoordinate from 'models/PolyCoordinate'
import Rec from 'models/RectCoordinate'
import G from 'models/G'
import Line from 'models/Line'
import Pentagram from 'models/Pentagram'

/* 测试 */

let m = new Map('app', 2)

let g = new G()

let rc_1 = new Rec({
  left: 100,
  top: 100,
  w: 1000,
  h: 300,  
  data: []
})

let _data = Array.apply(null, {length: 241}).map(item => {
  return Math.random() * 100 + 2800
})

rc_1.update(_data)
g.add(rc_1)
m.add(g)
m.render()
