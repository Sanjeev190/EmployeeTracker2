const { Pool } = require('pg');
const pool = new Pool(
    {
      // TODO: Enter PostgreSQL username
      user: 'postgres',
      // TODO: Enter PostgreSQL password
      password: '1234',
      host: 'localhost',
      database: 'books_db'
    },
    console.log(`Connected to the books_db database.`)
  )
  pool.connect();  
  const managerLIst=async()=>{
    
        const query = `
            SELECT CONCAT(first_name, ' ', last_name) AS full_name
            FROM employees
            WHERE manager_id IS NULL
        `;
        try {
            const result = await pool.query(query);
            const names = result.rows.map(row => row.full_name);
            console.log(names);
        } catch (error) {
            console.error('Error retrieving manager list:', error);
        }
    }
  module.exports=managerLIst;