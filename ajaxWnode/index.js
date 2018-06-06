const express = require('express')
const app = express()

const bodyParser = require('body-parser')

var products = [
  {
    id: 1,
    name: 'abby'
  },
  {
    id: 2,
    name: 'june' 
  },
  {
    id: 3,
    name: 'jhon'
  }
]
var currentId = 2

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())

app.get('/list', function (req, res) {
  res.send({ products })
})

app.post('/list', function (req, res) {
  let pname = req.body.name
  currentId++

  products.push({
    id: currentId,
    name: pname
  })

  res.send('post')
})

app.put('/list/:id', function (req, res) {
  let id = Number(req.params.id)
  let name = req.body.name

  let find = false
  products.forEach((item) => {
    if (!find && item.id === id) {
      item.name = name
      find = true
    }
  })
  
  res.send('put')
})

app.delete('/list/:id', function (req, res) {
  let id = Number(req.params.id)
  
  let find = false
  products.forEach((item, index) => {
    if (!find && item.id === id) {
      products.splice(index, 1)
    }
  })

  res.send('delete')
})

app.listen(3000, function () {
  console.log('Server is running at http://localhost:3000')
})