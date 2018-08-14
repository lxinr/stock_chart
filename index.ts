import Map from 'src/Map'
import Line from 'models/Line'
import Lines from 'models/Lines'
import G from 'models/G'

/* 测试 */
let m = new Map('app', 2)
let g_1 = new G()
let g_2 = new G()
let g_3 = new G()

let ls_1 = new Lines({
  pointers: [[100, 100], [100, 200], [130, 200]]
})

g_1.add(ls_1)
g_2.add(ls_1)
g_3.add(ls_1)

m.add(g_1)
m.add(g_2)
m.add(g_3)

g_1.center = g_2.center = g_3.center = [100, 200]

setInterval(function() {
  g_1.deg += 115
  g_2.deg += 125
  m.render()
}, 1000/ 24)