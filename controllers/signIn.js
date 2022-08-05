const bcrypt = require('bcrypt')
const db = require('../connection/db.js')

const signIn = (req, res) => {
  const { email, password } = req.body

  if (email == '' || password == '') {
    req.flash('warning', 'Please insert all fields')
    res.redirect('/signin')
    return
  }

  db.connect((error, client, done) => {
    if (error) return console.log(error)

    const query = `SELECT * FROM tb_user WHERE email='${email}'`

    client.query(query, (error, result) => {
      if (error) return console.log(error)

      const user = result.rows

      if (!user.length) {
        req.flash('error', `User doesn't exist`)
        res.redirect('/signin')
        return
      }

      if (!bcrypt.compareSync(password, user[0].password)) {
        req.flash('error', 'Wrong Password!')
        res.redirect('/signin')
        return
      }

      req.session.isLogin = true
      req.session.user = {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
      }

      done()
      res.redirect('/')
    })
  })
}

module.exports = signIn
