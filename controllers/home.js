const db = require('../connection/db.js')
const getDevTime = require('../helpers/getDevTime.js')

const home = (req, res) => {
  const { isLogin, user } = req.session
  let query
  
  db.connect((error, client, done) => {
    if (error) return console.log(error)
    if (isLogin) {
      query = `
        SELECT tb_projects.*, tb_user.name, tb_user.email
        FROM tb_projects LEFT JOIN tb_user
        ON tb_user.id = tb_projects.user_id
        WHERE tb_projects.user_id = ${user.id}
        ORDER BY tb_projects.id DESC
      `
    } else{
      query = `
        SELECT tb_projects.*, tb_user.name, tb_user.email
        FROM tb_projects LEFT JOIN tb_user
        ON tb_user.id = tb_projects.user_id
        ORDER BY tb_projects.id DESC
      `
    }

    client.query(query, (error, result) => {
      if (error) return console.log(error)

      const projects = result.rows.map(project => ({
        ...project,
        devTime: getDevTime(project.start_date, project.end_date),
        isLogin,
      }))

      done()
      res.render('index', { projects, isLogin, user })
    })
  })
}

module.exports = home
