const db = require('../connection/db.js')

const deleteProject = (req, res) => {
  const { id } = req.params

  db.connect((error, client, done) => {
    if (error) return console.log(error)

    const query = `DELETE FROM tb_projects WHERE id=${id}`

    client.query(query, error => {
      if (error) return console.log(error)
      done()
      res.redirect('/')
    })
  })
}

module.exports = deleteProject
