export default class Item {
  el: HTMLDivElement
  constructor(tag: string = '未命名标签'){
    this.el = document.createElement('div')
    this.el.innerText = tag
    this.el.addEventListener('click', function(){})
  }
}