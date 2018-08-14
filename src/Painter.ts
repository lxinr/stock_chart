let Painter = {
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
  reg(method:string, fn:Function) {
    this[method] = fn
  }
}

export default Painter