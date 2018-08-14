import Map from 'src/Map'
import Line from 'models/Line'
import Lines from 'models/Lines'
import G from 'models/G'

/* 测试 */
let m = new Map('app', 2)
let g_1 = new G()
g_1.center = [200, 200]
g_1.deg = 1
let ls_1 = new Lines({
  pointers: [[100, 100], [100, 200], [300, 300]]
})

g_1.add(ls_1)
m.add(ls_1)
m.add(g_1)
m.render()