const db = require('../connection/db.js')

const addProjectPage = (req, res) => {
  const { isLogin, user } = req.session
  if (!isLogin) return res.redirect('/signup')
  res.render('add-project', { isLogin, user })
}

const addProject = (req, res) => {
  const { title, startDate, endDate, description, techStack } = req.body
  const { id: userId } = req.session.user
  const { filename } = req.file

  db.connect((error, client, done) => {
    if (error) return console.log(error)

    const query = `
      INSERT INTO tb_projects (title, start_date, end_date, description, tech_stack, image, user_id)
      VALUES (
        '${title}',
        '${new Date(startDate).toISOString()}',
        '${new Date(endDate).toISOString()}',
        '${description}',
        ARRAY[${techStack.map(tech => `'${tech}'`).join(',')}],
        '/images/${filename}',
        ${userId}
      )
    `

    client.query(query, error => {
      if (error) return console.log(error)
      done()
      res.redirect('/')
    })
  })
}

module.exports = {
  addProject,
  addProjectPage,
}
