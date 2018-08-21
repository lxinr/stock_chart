import vNode from 'src/VNode'
import Painter from 'src/Painter'
import Line from 'models/Line'
import Lines from 'models/Lines'
import G from 'models/G';
import Text from 'models/Text'

let tag = 'RECT_TEMP'

interface rect {
  w?: number
  h?: number
  left?: number
  top?: number
  minX?: number
  minY?: number
  maxX?: number
  maxY?: number
  data: Array<number>
}

export default class RectCoordinate extends vNode {
  w: number = 100
  h: number = 100
  left: number = 0
  top: number = 0
  minX: number = 0
  maxX: number = 241
  minY: number = 0
  maxY: number = 100
  children: Array<any>
  data: Array<any>
  c: string
  readonly length: number = 241
  constructor(obj: rect) {
    super(tag)
    for(let x in obj) {
      this[x] = obj[x]
    }
    this.c = `rgba(${Math.round(Math.random() * 0xff)}, ${Math.round(Math.random() * 0xff)}, ${Math.round(Math.random() * 0xff)}, .3)`
    this.update(this.data)
  }
  // 数据更新
  update(data) {
    this.data = data
    if(!data || data.length <= 1) return
    let _maxY = Math.max.apply(Math, this.data)
    let _minY = Math.min.apply(Math, this.data)
    this.maxY = _maxY + (_maxY - _minY) * .3
    this.minY = _minY - (_maxY - _minY) * .3
  }
  // 坐标映射
  coord(pointer: [number, number]) {
    const { maxX, maxY, minX, minY, w, h, top, perW} = this
    const perX = w / (maxX - minX)
    const perY = h / (maxY - minY)
    let _x = perW * pointer[0]
    let _y = h - (pointer[1] - minY) * perY
    return [_x, _y]
  }
  // 单位宽度
  get perW() {
    return this.w / this.length
  }
}

Painter.reg(tag, function(node: RectCoordinate) {
  const {w, h, left, top, minX, minY, maxX, maxY, data, c} = node
  const _self = this
  let g = new G({
    left,
    top,
    w,
    h,
    c
  })
  // 创建坐标
  let rc = new Lines({
    pointers: [
      [0, 0],
      [0, h],
      [0 + w, h],
      [0 + w, 0]
    ],
    c: '#ddd',
    w: .3
  })
  // 纵坐标刻度
  let g_v = new G()
  let g_0 = new G()
  for(let x = 0; x <= 11; x++) {
    let _x = - 10
    let _y = h - x * (h / 11)
    g_v.add(new Line({
      p1: node.coord([0, (maxY - minY) / 11 * x + minY]) as [number, number],
      p2: node.coord([241, (maxY - minY) / 11 * x + minY]) as [number, number],
      c: 'rgba(233, 233, 233, .3)',
      w: .3
    }))    
    g_v.add(new Text({
      text: ((maxY - minY) / 11 * x + minY).toFixed(2),
      left: _x,
      top: _y,
      textAlign: 'right',
      c: '#ccc'
    }))
  }
  // 横坐标刻度
  let g_h = new G()
  let strs = ['9:30', '10:00', '10:30', '11:00', '11:30/13:00', '13:30', '14:00', "14:30", "15:00"]
  for(let i = 0; i < strs.length; i ++) {
    let _x = w / (strs.length - 1) * i 
    let _y = h + 12
    g_h.add(new Text({
      text: strs[i],
      left: _x,
      top: _y,
      textAlign: 'center',
      c: '#ccc'
    }))
  }
  g.add(g_v)
  g.add(g_h)
  g.add(rc)
  // 绘制线段组
  let perW = node.perW
  let _data = data.map((item, index) => node.coord([index, item]))
  for(let i = 0; i < _data.length; i++) {
    let _l = new Line({
      p1: [_data[i][0], 0],
      p2: _data[i] as [number, number]
    })
    g.add(_l)
  }
  Painter.draw(_self, 'G', g)  
})