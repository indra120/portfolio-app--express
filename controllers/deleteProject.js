const db = require('../connection/db.js')

const deleteProject = (req, res) => {
  const { id } = req.params
  db.connect((error, client, done) => {
    if (error) console.log(error)

    client.query(`DELETE FROM tb_projects WHERE id=${id}`, (error, result) => {
      done()
      if (error) console.log(error)
      res.redirect('/')
    })
  })
}

module.exports = deleteProject
