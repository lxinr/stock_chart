import 'src/assets/style/index.scss';
import Map from 'src/Map'
import RectCoordinate from 'models/RectCoordinate'
import Item from 'src/workbench/backpack/item';
/* 测试 */
let m = new Map('app', 2)

let data = []
let start = 2800

let nodes = []
for(let x = 0; x < 6; x++) {
  let rc = new RectCoordinate({
    w: 330,
    h: (m.h - 200) / 2,
    left: x % 3 * ((m.w) / 3) + 80,
    top: x >=3 ? m.h / 2 + 25 : 50,
    data: []
  })
  nodes.push(rc)
  m.add(rc)
}

let t = setInterval(function() {
  let x = data.length
  if(x >= 241) return clearInterval(t)
  data.push(Number((start += Math.random() * 6 - 3).toFixed(2)))
  nodes.forEach(item => {item.update(data)})
  m.render()
}, 1000/60)