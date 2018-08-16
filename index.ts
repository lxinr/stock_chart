import Map from 'src/Map'
import PolyCoordinate from 'models/PolyCoordinate'
import G from 'models/G'
import Line from 'models/Line'
import Pentagram from 'models/Pentagram'

/* 测试 */
let m = new Map('app', 2)
let g = new G()


let size = 50
for(let x = 10; x; x--) {
  let pg_1 = new Pentagram({
    size,
    left: (10 - x) * (size * 1.2),
    top: 10
  })
  g.add(pg_1)
}

m.add(g)
m.render()