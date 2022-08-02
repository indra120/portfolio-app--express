const express = require('express')
const path = require('path')
const {
  addProject,
  addProjectPage,
  deleteProject,
  details,
  editProject,
  editProjectPage,
  home,
} = require('./controllers')

const app = express()
const PORT = 3000

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/views'))

app.use('/static', express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', home)

app.get('/contact', (req, res) => {
  res.render('contact')
})

app.get('/project/add', addProjectPage)
app.post('/project/add', addProject)

app.get('/project/delete/:id', deleteProject)

app.get('/project/edit/:id', editProjectPage)
app.post('/project/edit/:id', editProject)

app.get('/project-details/:id', details)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
