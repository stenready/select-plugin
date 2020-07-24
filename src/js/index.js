/* eslint-disable no-unused-vars */
import Select from './select/select'


const select = new Select('#select', {
  placeholder: 'Some select text',
  selectedId: '3',
  onSelect(elem) {
    console.log(elem)
  },
  data: [
    {
      id: 1,
      value: 'React'
    },
    {
      id: 2,
      value: 'Angular'
    },
    {
      id: 3,
      value: 'Vue.js'
    },
    {
      id: 4,
      value: 'Pure js'
    },
  ]
})


window.s = select
