const { Pool } = require('pg')

const pool = new Pool({
  database: 'portfolio',
  port: 5432,
  user: 'postgres',
  password: 'ryzenix',
})

module.exports = pool
