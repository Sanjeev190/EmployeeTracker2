
const { Pool } = require('pg');
const pool = new Pool(
    {
      // TODO: Enter PostgreSQL username
      user: 'postgres',
      // TODO: Enter PostgreSQL password
      password: '1234',
      host: 'localhost',
      database: 'employee_db'
    });
    
    module.exports=pool;