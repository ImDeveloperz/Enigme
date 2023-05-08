const mysql = require('mysql2');
export const db = mysql.createPool({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    port: 3306,
    database:process.env.DATABASE,
});

db.getConnection((err)=>{
  if(err){
    console.log("error connection ...");
  }
    console.log("connected ...");
});
db.execute(
  'SELECT * FROM `users` ',
  function(err, results, fields) {
    console.log(results); 
  })
