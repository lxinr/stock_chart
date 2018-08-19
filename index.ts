import Map from 'src/Map'
import PolyCoordinate from 'models/PolyCoordinate'
import G from 'models/G'
import Line from 'models/Line'
import Pentagram from 'models/Pentagram'

/* 测试 */

let m = new Map('app', 2)

let size = 75
let row = Math.floor(m.w / (size * 1.1))
let col = Math.floor(m.h / (size * 1.1))

for(let i = 0; i <= row * col; i++) {
  let _r = Math.round(Math.random() * 0xff)
  let _g = Math.round(Math.random() * 0xff)
  let _b = Math.round(Math.random() * 0xff)
  let g = new G({
    left: (size * 1.1) * (i % row),
    top: Math.floor(i / row) * (size * 1.1),
    w: size,
    h: size,
    onFocus: function() {
      this.c = `rgba(${_r}, ${_g}, ${_g}`
      this.deg = 45
    }
  })
  g.center = [(size * 1.1) * (i % row) + g.w /2,  Math.floor(i / row) * (size * 1.1) + g.h/2]
  m.add(g)
}

m.render()
