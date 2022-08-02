const db = require('../connection/db.js')

const details = (req, res) => {
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
          dev_time: getDevTime(project.start_date, project.end_date),
          start_date: new Date(project.start_date).toDateString(),
          end_date: new Date(project.end_date).toDateString(),
        }

        res.render('project-details', { project })
      }
    )
  })
}

module.exports = details
