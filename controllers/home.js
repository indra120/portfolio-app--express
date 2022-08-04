const db = require('../connection/db.js')
const getDevTime = require('../helpers/getDevTime.js')

const home = (req, res, { isLogin }) => {
  db.connect((error, client, done) => {
    if (error) console.log(error)

    client.query('SELECT * FROM tb_projects', (error, result) => {
      done()
      if (error) console.log(error)

      const projects = result.rows.map(project => ({
        ...project,
        devTime: getDevTime(project.start_date, project.end_date),
        isLogin,
      }))

      res.render('index', { projects })
    })
  })
}

module.exports = home
