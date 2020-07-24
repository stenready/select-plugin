# select-plugin

<p>
 Simple Select Plugin
</p>
<p>Code:  https://github.com/stenready/select-plugin/blob/master/src/js/select/select.js</p>
<p>Code css:  https://github.com/stenready/select-plugin/blob/master/src/sass/index.scss</p>

## Usage


```javascript
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
```

## Contributing


##Author
<p>
  <a href="https://github.com/stenready">https://github.com/stenready</a>
</p>
<p>
  mastars2319@gmail.com
</p>



