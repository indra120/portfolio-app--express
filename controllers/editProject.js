const db = require('../connection/db.js')

const editProjectPage = (req, res) => {
  const { id } = req.params
  db.connect((error, client, done) => {
    if (error) console.log(error)

    client.query(
      `SELECT * FROM tb_projects WHERE id=${Number(id)};`,
      (error, result) => {
        done()
        if (error) console.log(error)

        let project = result.rows[0]

        project = {
          ...project,
          start_date: new Date(project.start_date).toISOString().slice(0, 10),
          end_date: new Date(project.end_date).toISOString().slice(0, 10),
        }

        res.render('edit-project', { project })
      }
    )
  })
}

const editProject = (req, res) => {
  const { name, startDate, endDate, description, techStack, image } = req.body
  const { id } = req.params

  db.connect((error, client, done) => {
    if (error) console.log(error)

    client.query(
      `UPDATE tb_projects
      SET name='${name}', start_date='${new Date(
        startDate
      ).toISOString()}', end_date='${new Date(
        endDate
      ).toISOString()}', description='${description}', tech_stack=ARRAY[${techStack
        .map(tech => `'${tech}'`)
        .join(',')}], image='${image}'
      WHERE id=${Number(id)}`,
      (error, result) => {
        done()
        if (error) console.log(error)
        res.redirect('/')
      }
    )
  })
}

module.exports = { editProject, editProjectPage }
