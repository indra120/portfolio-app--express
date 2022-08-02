const db = require('../connection/db.js')

const addProjectPage = (req, res) => {
  if (!isLogin) {
    res.redirect('/auth')
    return
  }
  res.render('add-project')
}

const addProject = (req, res) => {
  const { name, startDate, endDate, description, techStack, image } = req.body

  db.connect((error, client, done) => {
    if (error) console.log(error)

    client.query(
      `INSERT INTO tb_projects (name, start_date, end_date, description, tech_stack, image)
        VALUES ('${name}', '${new Date(startDate).toISOString()}', '${new Date(
        endDate
      ).toISOString()}', '${description}', ARRAY[${techStack
        .map(tech => `'${tech}'`)
        .join(',')}], '${image}')`,
      (error, result) => {
        done()
        if (error) console.log(error)
        res.redirect('/')
      }
    )
  })
}

module.exports = {
  addProject,
  addProjectPage,
}
