/* eslint-disable no-unused-vars */
const __toHtml=(data, placeholder, selectedId) => {
  let text=placeholder||'Default text select'
  const items=data.map((el) => {
    let cls=''
    if (+selectedId===+el.id) {
      text=el.value
      cls=' selected'
    }
    return `
      <li class="select__item ${cls}" data-type="item" data-id="${el.id}"> ${el.value} </li>
      `
  })
  return `
        <div class="select__background" data-type="background"></div>
        <div class="select__input" data-type="input">
            <div data-type="input" data-value="value" class="text"> ${text} </div>
            <i data-type="input" class="material-icons arrow">expand_more</i>
        </div>
        <div class="select__dropdown">
            <ul class="select__list">
            ${items.join('')}
            </ul>
        </div>
    `
}

export default class Select {
  constructor(selector, options) {
    this.$el=document.querySelector(selector)
    this.selectedId=null
    this.options=options
    this.__render()
    this.__setup()
  }

  __render() {
    const {placeholder, data, selectedId}=this.options
    this.$el.classList.add('select')
    this.$el.innerHTML=__toHtml(data, placeholder, selectedId)
  }


  get currentSelect() {
    return this.options.data.find((el) => +el.id===+this.selectedId)
  }

  clickHandler(e) {
    const {type}=e.target.dataset
    if (type==='input') {
      this.toggle()
    } else if (type==='item') {
      this.select(e.target.dataset.id)
    } else if (type === 'background') {
      this.close()
    }
  }

  select(id) {
    this.selectedId=id
    this.$valueInput.textContent=this.currentSelect.value
    this.$el.querySelectorAll('[data-type="item"').forEach((el) => el.classList.remove('selected'))
    this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected')
    this.close()
    this.options.onSelect ? this.options.onSelect(this.currentSelect) : false
  }
  __setup() {
    this.$el.addEventListener('click', this.clickHandler.bind(this))
    this.$valueInput=this.$el.querySelector('[data-value=\'value\']')
  }
  get isOpen() {
    return this.$el.classList.contains('open')? true:false
  }

  toggle() {
        this.isOpen? this.close():this.open()
  }

  open() {
    this.$el.classList.add('open')
  }

  close() {
    this.$el.classList.remove('open')
  }

  destroy() {
    this.$el.removeEventListener('click', this.clickHandler)
    this.$el.innerHTML=''
  }
}
