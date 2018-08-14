class Map {
  w: number
  h: number
  fr: HTMLElement
  el: HTMLCanvasElement
  C: CanvasRenderingContext2D
  dpr: number
  nodes: Array<Line>
  mouse: any
  view: {
    x: 0,
    y: 0,
    w: number,
    h: number
  }
  constructor(id: string, dpr: number = 1) {
    this.fr = document.getElementById(id)
    this.el = document.createElement('canvas')
    this.view = {
      x: 0,
      y: 0,
      w: this.fr.offsetWidth,
      h: this.fr.offsetHeight
    }
    this.el.width = this.fr.offsetWidth * dpr
    this.w = this.fr.offsetWidth
    this.el.height = this.fr.offsetHeight * dpr
    this.h = this.fr.offsetHeight
    this.dpr = dpr
    this.el.style.width = this.fr.offsetWidth + 'px'
    this.el.style.height = this.fr.offsetHeight + 'px'
    this.fr.appendChild(this.el)
    this.C = this.el.getContext('2d')
    this.C.imageSmoothingEnabled = true;
    this.C.scale(dpr, dpr)
    this.nodes = []
    this.mouse = {}
    this.el.addEventListener('mousemove', () => { this.handleMousemove(event) })
  }
  render() {
    const { nodes, C, w, h, view } = this
    C.clearRect(view.x, view.y, w, h)
    for(let node of nodes) {
      painter.draw(C, node.tag, node)
    }
   
  }
  viewMove(x: number, y: number) {
    this.view.x += x
    this.view.y += y
    this.C.translate(-x, -y)
  }
  add(obj: any) {
    this.nodes.push(obj)
  }
  remove(obj: any) {
    let i = this.nodes.indexOf(obj)
    this.nodes.splice(i, 1)
  }
  clear() {
    const { C, w, h, view } = this
    C.clearRect(view.x, view.y, w, h)
    this.C.translate(view.x, view.y)
    this.nodes = []
    this.view.x = 0
    this.view.y = 0
  }
  handleMousemove(e) {
    if (!e) return
    this.mouse.x = e.layerX
    this.mouse.y = e.layerY
  }
}

class vNode {
  tag: string
  id: string
  name: string
  constructor(tag: string) {
    this.tag = tag
  }
}

/* 线段 */
interface line {
  p1: [number, number]
  p2: [number, number]
  c?: string
  w?: number
}
class Line extends vNode {
  _p1: [number, number]
  _p2: [number, number]
  p1: [number, number]
  p2: [number, number]
  pm: [number, number]
  c: string
  w: number
  constructor(obj:line) {
    super('LINE')
    if(!obj.c) obj.c = '#ff0'
    if(!obj.w) obj.w = 1
    for(let x in obj) {
      this[x] = obj[x]
    }
    this._p1 = this.p1
    this._p2 = this.p2
     this.pm = [(this.p1[0] + this.p2[0])/2, (this.p1[1] + this.p2[1])/2]
  }
  matrix(a:number = 1, b:number = 1, c:number = 0, d:number = 0, e:number = 0, f:number = 0) {
    const { _p1, _p2, pm } = this
    function calc(pointer: [number, number]): [number, number] {
      let _p = [pointer[0] - pm[0], pointer[1] - pm[1]]
      return [a * _p[0] +  c * _p[1] + e + pm[0], b * _p[0] + d * _p[1] + f + pm[1]]
    }
    this.p1 = calc(_p1)
    this.p2 = calc(_p2)
  }
  /**
   * 旋转
   * @param deg 角度
   */
  rotate(deg) {
    this.matrix(Math.cos(deg * Math.PI / 180),Math.sin(deg * Math.PI / 180),-Math.sin(deg * Math.PI / 180),Math.cos(deg * Math.PI / 180), 0, 0)
  }
  /**
   * 平移
   * @param x x { number }
   * @param y y { number }
    */
   translate(x:number, y:number) {
    this.matrix(1, 0, 0, 1, x, y)
   }
}

/* 多边形 */
interface polygon {
  pointers: Array<[number, number]>
  c?: string
  fill?: boolean
  center?: [number, number]
}
class Polygon extends vNode {
  pointers: Array<[number, number]>
  c?: string
  fill: boolean
  center: [number, number]
  constructor(obj: polygon) {
    super('POLYGON')
    this.calcCenter(obj.pointers)
    obj.pointers.sort((a:[number, number], b: [number, number]) => {
      return (a[0] - this.center[0]) * (b[1] - this.center[1]) - (a[1] - this.center[1]) * (b[0] - this.center[0])
    })
    for(let x in obj) {
      this[x] = obj[x]
    }
  }
  calcCenter(pointers: Array<[number, number]>) {
    let pE = [0, 0]
    for(let x in pointers) {
      pE[0] += pointers[x][0]
      pE[1] += pointers[x][1]
    }
    this.center = [pE[0]/pointers.length, pE[1]/pointers.length]
  }
  shake() {
    this.pointers = this.pointers.map(item => {
      item[0] += Math.random() * 4 - 2
      return item
    })
  }
}

/* 线段集合 */
class Lines extends vNode {
  pointers: Array<[number, number]>
  c?: string  
  constructor(obj: polygon) {
    super('LINES')
    for(let x in obj) {
      this[x] = obj[x]
    }    
  }
}

const painter = {
  c: CanvasRenderingContext2D,
  draw(c, type:string, obj) {
    this.c = c
    return (() => {
      c.save()
      c.beginPath()
      this[type].call(c, obj)
      c.restore()
    })()
  },
  LINE(node: Line) {
    const { p1, p2, pm, c } = node
    this.moveTo(...p1)
    // this.lineTo(...p2)
    this.bezierCurveTo(p1[0] + (p2[0] - p1[0]) / 2, p1[1], p2[0] - (p2[0] - p1[0]) / 2, p2[1], p2[0], p2[1])
    this.strokeStyle = c
    this.stroke()
    // this.beginPath()
    // this.arc(...pm, 10, 0, Math.PI * 2)
    // this.fillStyle = c
    // this.fill()
  },
  LINES(node: Lines) {
    const { pointers, c = '#f00' } = node
    let perX = (m.w - 100) / 241
    this.beginPath()
    pointers[0] && this.moveTo(0, pointers[0][1])
    for(let x = 1; x < pointers.length; x += 1) {
      this.bezierCurveTo((x - 1) * perX + (x * perX - (x - 1) * perX) / 2, pointers[x - 1][1], x * perX - (x * perX - (x - 1) * perX) / 2, pointers[x][1], x * perX, pointers[x][1])
    }
    this.strokeStyle = c
    this.stroke()
  },
  POLYGON(node: Polygon) {
    const { pointers, c = '#f00' } = node
    this.beginPath()
    for(let x in pointers) {
      this.lineTo(pointers[x][0] + 300, pointers[x][1])
    }
    this.strokeStyle = c
    this.closePath()    
    this.stroke()
    this.fill()
  }
}

let m = new Map('app', 2)

m.render()

let click

click = function(e:MouseEvent) {
  m.clear()
  stockData()
}

m.fr.addEventListener('click', click)

let itv_1
let l_1 = new Lines({
  pointers: []
})

/* 股票数据 */
function stockData() {
  m.add(l_1)
  if(itv_1) clearInterval(itv_1)
  let perX = (m.w - 100) / 241
  let r = m.h / 2
  l_1.pointers = []
  itv_1 = setInterval(function() {
    let _ran = Math.random() * 60 - 30
    if(l_1.pointers.length >= 241) {
      l_1.pointers.shift()
      m.viewMove(0, _ran)
    }
    r += _ran
    l_1.pointers.push([l_1.pointers.length * perX + 50, r])
  }, 50)
}
stockData()
/* 控制面板 */
let controlPane = document.createElement('div')
controlPane.style.position = 'absolute'
controlPane.style.top = '0'
controlPane.style.height = '60px'
/* 按钮 */
let clearBtn = document.createElement('button')
clearBtn.textContent = '清除'
clearBtn.addEventListener('click', function(e:MouseEvent) {
  m.clear()
})
controlPane.appendChild(clearBtn)

document.body.appendChild(controlPane)

let controller = {
  do(key: string) {
    this[key].apply(this)
  },
  d() {
    m.viewMove(10, 0)
  },
  a() {
    m.viewMove(-10, 0)
  }
}

document.addEventListener('keypress', function(e:KeyboardEvent) {
  controller.do(e.key)
})

// d

setInterval(function() {
  m.render()
}, 1000 / 12)