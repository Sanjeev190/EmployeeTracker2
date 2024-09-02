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

const departmentList=async()=>{
    try {
        const result = await pool.query('SELECT name FROM department');
        
        return console.log(result.rows.map(row => row.name)); 
        // Extract department names
    } catch (err) {
        console.error('Error fetching departments:', err.stack);
        return [];
    }

}

module.exports=departmentList();

