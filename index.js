const express = require('express')
const path = require('path')
const session = require('express-session')
const flash = require('express-flash')
const dotenv = require('dotenv')
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
const upload = require('./middlewares/imageUpload')
const getTechStack = require('./controllers/getTechStack')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.set('view engine', 'hbs')

app.use('/static', express.static(path.join(__dirname, '/public')))
app.use('/images', express.static(path.join(__dirname, '/images')))
app.use(express.urlencoded({ extended: false }))
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

app.get('/contact', (req, res) => {
  const { isLogin, user } = req.session
  res.render('contact', { isLogin, user })
})

app.get('/signup', (req, res) => res.render('sign-up'))
app.post('/signup', signUp)

app.get('/signin', (req, res) => res.render('sign-in'))
app.post('/signin', signIn)

app.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

app.get('/project/add', addProjectPage)
app.post('/project/add', upload.single('image'), addProject)

app.get('/project/delete/:id', deleteProject)

app.get('/project/tech-stack/:id', async (req, res) => {
  const { id } = req.params
  const { tech_stack } = await getTechStack(id)

  res.status(200).json({ tech_stack })
})
app.get('/project/edit/:id', editProjectPage)
app.post('/project/edit/:id', upload.single('image'), editProject)

app.get('/project-details/:id', details)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
