const express = require('express')
const path = require('path')
const bcrypt = require('bcrypt')
const session = require('express-session')
const flash = require('express-flash')
const {
  addProject,
  addProjectPage,
  deleteProject,
  details,
  editProject,
  editProjectPage,
  home,
  signUp,
  signIn,
} = require('./controllers')

const app = express()
const PORT = 3000

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/views'))

app.use('/static', express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({ extended: false }))
// app.use(express.json())
app.use(flash())
app.use(
  session({
    secret: 'qwertyuiop',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 },
  })
)

app.get('/', home)

app.get('/contact', (req, res) => res.render('contact'))

app.get('/signup', (req, res) => res.render('sign-up'))
app.post('/signup', signUp)

app.get('/signin', (req, res) => res.render('sign-in'))
app.post('/signin', signIn)

app.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

app.get('/project/add', addProjectPage)
app.post('/project/add', addProject)

app.get('/project/delete/:id', deleteProject)

app.get('/project/edit/:id', editProjectPage)
app.post('/project/edit/:id', editProject)

app.get('/project-details/:id', details)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
