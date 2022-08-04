const bcrypt = require('bcrypt')
const db = require('../connection/db.js')
const useState = require('../helpers/useState.js')

const signUp = (req, res) => {
  const { name, email, password } = req.body
  if (name === '' || email === '' || password === '') {
    req.flash('warning', 'Please insert all fields')
    res.redirect('/signup')
    return
  }

  db.connect((error, client, done) => {
    if (error) console.log(error)

    const getExistingUser = `SELECT id,password FROM tb_user WHERE email='${email}'`

    client.query(getExistingUser, (error, result) => {
      const existingUser = result.rows

      if (existingUser.length) {
        const isPasswordCorrect = bcrypt.compareSync(
          password,
          existingUser[0].password
        )

        if (!isPasswordCorrect) {
          req.flash(
            'error',
            `You're already be a member, but you use the wrong password!`
          )
          res.redirect('/signin')
          return
        }

        req.session.isLogin = true
        req.session.user = {
          id: existingUser[0].id,
          name,
          email,
        }
        done()
        res.redirect('/')
        return
      } else {
        const hashedPassword = bcrypt.hashSync(password, 10)
        const register = `INSERT INTO tb_user(name, email, password) VALUES ('${name}', '${email}', '${hashedPassword}')`

        client.query(register, error => {
          if (error) console.log(error)

          client.query(
            `SELECT id,name,email FROM tb_user WHERE email='${email}'`,
            (error, result) => {
              const { id, name, email } = result.rows[0]
              req.session.isLogin = true
              req.session.user = {
                id,
                name,
                email,
              }

              done()
              res.redirect('/')
            }
          )
        })
      }
    })
  })
}

module.exports = signUp
