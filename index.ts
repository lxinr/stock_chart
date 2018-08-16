import Map from 'src/Map'
import PolyCoordinate from 'models/PolyCoordinate'
/* 测试 */
let m = new Map('app', 2)

let polyC_1 = new PolyCoordinate({
  axis: ['力量', '智力', '精神', '敏捷', '耐力'],
  data: [60, 70, 90, 50, 85],
  w: 100,
  h: 100
})

m.add(polyC_1)
m.render()