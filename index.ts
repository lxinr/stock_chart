import Map from 'src/Map'
import PolyCoordinate from 'models/PolyCoordinate'
import G from 'models/G'
import Line from 'models/Line'
import Pentagram from 'models/Pentagram'

/* 测试 */
let m = new Map('app', 2)
let g = new G()
let fr = new G()

let size = 50
for(let x = 5; x; x--) {
  let pg_1 = new Pentagram({
    size,
    left: m.w / 2 - x * (size * 1.5) + 100,
    top: m.h / 2
  })
  g.add(pg_1)
}
g.center = [m.w /2 , m.h /2 ]
fr.add(g)
m.add(fr)
let t = setInterval(function() {
  if(g.deg >= 10) return x()
  m.render(false)
  g.deg += 30
  g.left += 0
  g.top -= 0
}, 1000/ 20)

fr.center = [m.w /2 , m.h /2 ]

let _d = 0

function x() {
  clearInterval(t)
  let x = setInterval(function() {
    if(fr.deg >= 10800) clearInterval(x)
    m.render(false)
    g.deg -= Math.cos((++_d) * Math.PI / 180) * 5
    fr.deg += 1
    fr.left += Math.cos((++_d) * Math.PI / 180) * 2
    fr.top -=  Math.sin((++_d) * Math.PI / 180) * 10
  }, 1000/ 24)  
}