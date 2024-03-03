const { Pool } = require('pg');
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'user',
    password: 'password',
    database: 'challenge'
})

module.exports = pool