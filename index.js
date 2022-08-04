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
const useState = require('./helpers/useState.js')

const app = express()
const PORT = 3000
const [isLogin, setIsLogin] = useState(false)

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/views'))

app.use('/static', express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => home(req, res, { isLogin }))

app.get('/contact', (req, res) => res.render('contact'))

app.get('/signup', (req, res) => res.render('sign-up'))
app.get('/signin', (req, res) => res.render('sign-in'))

app.get('/project/add', (req, res) => {
  addProjectPage(req, res, { isLogin })
})
app.post('/project/add', addProject)

app.get('/project/delete/:id', deleteProject)

app.get('/project/edit/:id', editProjectPage)
app.post('/project/edit/:id', editProject)

app.get('/project-details/:id', details)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
