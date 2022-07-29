const express = require('express')
const path = require('path')
const getDevTime = require('./helpers/getDevTime.js')

const app = express()
const PORT = 3000
let isLogin = true
let projects = []

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/views'))

app.use('/static', express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.render('index', { projects })
})

app.get('/contact', (req, res) => {
  res.render('contact')
})

app.post('/project', (req, res) => {
  const { name, startDate, endDate, description, techStack } = req.body
  projects.push({
    name,
    startDate,
    endDate,
    start: new Date(startDate).toLocaleDateString(),
    finish: new Date(endDate).toLocaleDateString(),
    description,
    devTime: getDevTime(startDate, endDate),
    isLogin,
    techStack,
  })
  res.redirect('/')
})

app.get('/project', (req, res) => {
  if (!isLogin) {
    res.redirect('/auth')
    return
  }
  res.render('project')
})

app.get('/project/delete/:id', (req, res) => {
  const { id } = req.params
  projects = projects.filter((project, index) => index !== Number(id))
  res.redirect('/')
})

app.get('/project/edit/:id', (req, res) => {
  const { id } = req.params
  const project = projects[id]
  res.render('project', {
    // project: {
    //   ...project,
    //   start: new Date(project.start).toISOString(),
    //   finish: new Date(project.finish).toISOString(),
    // },
    project,
    edit: true,
  })
})

app.get('/project-details/:id', (req, res) => {
  const { id } = req.params
  const project = projects[id]
  res.render('project-details', { project })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
