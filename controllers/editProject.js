const db = require('../connection/db.js')

const editProjectPage = (req, res) => {
  const { id } = req.params
  const { isLogin, user } = req.session

  db.connect((error, client, done) => {
    if (error) return console.log(error)

    const query = `SELECT * FROM tb_projects WHERE id=${Number(id)}`

    client.query(query, (error, result) => {
      if (error) return console.log(error)

      let project = result.rows[0]

      project = {
        ...project,
        start_date: new Date(project.start_date).toISOString().slice(0, 10),
        end_date: new Date(project.end_date).toISOString().slice(0, 10),
      }

      done()
      res.render('edit-project', { project, isLogin, user })
    })
  })
}

const editProject = (req, res) => {
  let { title, startDate, endDate, description, techStack } = req.body
  const { filename } = req.file
  const { id } = req.params

  if (typeof techStack === 'string') {
    techStack = Array(techStack)
  }

  db.connect((error, client, done) => {
    if (error) return console.log(error)

    const query=`
      UPDATE tb_projects
      SET title='${title}',
        start_date='${new Date(startDate).toISOString()}',
        end_date='${new Date(endDate).toISOString()}',
        description='${description}',
        tech_stack=ARRAY[${techStack.length ? techStack.map(tech => `'${tech}'`).join(',') : techStack}],
        image='/images/${filename}'
      WHERE id=${id}
    `

    client.query(query, error => {
        if (error) return console.log(error)
        done()
        res.redirect('/')
      }
    )
  })
}

module.exports = { editProject, editProjectPage }
