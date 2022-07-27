const express = require('express')
const path = require('path')

const app = express()
const PORT = 3000
const isLogin = true

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/views'))

app.use('/static', express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.render('index', { isLogin })
})

app.get('/contact', (req, res) => {
  res.render('contact')
})

app.post('/project', (req, res) => {
  const data = req.body
  console.log(data)

  res.redirect('/')
})

app.get('/project', (req, res) => {
  if (!isLogin) {
    res.redirect('/auth')
    return
  }
  res.render('project')
})

app.get('/project-details/:id', (req, res) => {
  const { id } = req.params
  console.log(id)
  res.render('project-details')
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
