const express = require('express')
const path = require('path')
const getDevTime = require('./helpers/getDevTime.js')
const db = require('./connection/db.js')

const app = express()
const PORT = 3000
let isLogin = true
let projects = []

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/views'))

app.use('/static', express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
  db.connect((error, client, done) => {
    if (error) throw error

    client.query('SELECT * FROM tb_projects', (error, result) => {
      done()
      if (error) throw error

      const projects = result.rows.map(project => ({
        ...project,
        devTime: getDevTime(project.start_date, project.end_date),
        isLogin,
      }))

      res.render('index', { projects })
    })
  })
})

app.get('/contact', (req, res) => {
  res.render('contact')
})

app.get('/project/add', (req, res) => {
  if (!isLogin) {
    res.redirect('/auth')
    return
  }
  res.render('add-project')
})
app.post('/project/add', (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ error })
  }
})

app.get('/project/delete/:id', (req, res) => {
  const { id } = req.params
  db.connect((error, client, done) => {
    if (error) throw error

    client.query(`DELETE FROM tb_projects WHERE id=${id}`, (error, result) => {
      done()
      if (error) throw error
      res.redirect('/')
    })
  })
})

app.get('/project/edit/:id', (req, res) => {
  try {
    const { id } = req.params
    const project = projects[id]
    res.render('edit-project', { project: { ...project, id } })
  } catch (error) {
    res.status(500).json({ error })
  }
})
app.post('/project/edit/:id', (req, res) => {
  try {
    const { name, startDate, endDate, description, techStack } = req.body
    const { id } = req.params

    projects[id] = {
      ...projects[id],
      name,
      startDate,
      endDate,
      description,
      techStack,
    }

    res.redirect('/')
  } catch (error) {
    res.status(500).json({ error })
  }
})

app.get('/project-details/:id', (req, res) => {
  const { id } = req.params
  db.connect((error, client, done) => {
    if (error) throw error

    client.query(
      `SELECT * FROM tb_projects WHERE id=${Number(id)};`,
      (error, result) => {
        done()
        if (error) throw error

        let project = result.rows[0]

        project = {
          ...project,
          dev_time: getDevTime(project.start_date, project.end_date),
          start_date: new Date(project.start_date).toDateString(),
          end_date: new Date(project.end_date).toDateString(),
        }

        res.render('project-details', { project })
      }
    )
  })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
