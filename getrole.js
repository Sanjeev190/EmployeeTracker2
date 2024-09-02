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

const roleList=async()=>{
    try {
        const result = await pool.query('SELECT * FROM role');
        return result.rows.map(row => row.title); // Extract department names
    } catch (err) {
        console.error('Error fetching departments:', err.stack);
        return [];
    }

}
module.exports=roleList;


