const db = require('../connection/db.js')
const getDevTime = require('../helpers/getDevTime.js')

const details = (req, res) => {
  const { id } = req.params
  const { isLogin, user } = req.session

  db.connect((error, client, done) => {
    if (error) return console.log(error)

    const query = `
      SELECT tb_projects.*, tb_user.name, tb_user.email
      FROM tb_projects LEFT JOIN tb_user
      ON tb_user.id = tb_projects.user_id
      WHERE tb_projects.id = ${id}
    `

    client.query(query, (error, result) => {
      if (error) return console.log(error)

      let project = result.rows[0]

      project = {
        ...project,
        dev_time: getDevTime(project.start_date, project.end_date),
        start_date: new Date(project.start_date).toDateString(),
        end_date: new Date(project.end_date).toDateString(),
      }

      done()
      res.render('project-details', { project, isLogin, user })
    })
  })
}

module.exports = details
