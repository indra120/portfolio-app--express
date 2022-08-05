const db = require('../connection/db.js')

const getTechStack = id =>
  new Promise((resolve, reject) => {
    db.connect((error, client, done) => {
      if (error) return console.log(error)

      const query = `SELECT tech_stack FROM tb_projects WHERE id=${Number(id)}`

      client.query(query, (error, result) => {
        if (error) reject(error)

        let tech_stack = result.rows[0]

        done()

        resolve(tech_stack)
      })
    })
  })

module.exports = getTechStack
