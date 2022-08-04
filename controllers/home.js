const db = require('../connection/db.js')
const getDevTime = require('../helpers/getDevTime.js')

const home = (req, res) => {
  const { isLogin, user } = req.session
  db.connect((error, client, done) => {
    if (error) console.log(error)

    client.query(
      'SELECT * FROM tb_projects ORDER BY id DESC',
      (error, result) => {
        done()
        if (error) console.log(error)

        const projects = result.rows.map(project => ({
          ...project,
          devTime: getDevTime(project.start_date, project.end_date),
          isLogin,
        }))

        res.render('index', { projects, isLogin, user })
      }
    )
  })
}

module.exports = home
