import dotenv from 'dotenv';
import pkg from 'pg';

const {Pool} = pkg;
dotenv.config();


const pool = new Pool({
    user : process.env.DB_USER,
    host : process.env.DB_HOST,
    database : process.env.DB_NAME,
    password : process.env.DB_PASSWORD,
    port : process.env.DB_PORT,
})

pool.on("connect", async ()=>{
    console.log("connected to the database");
});


await pool.query('SELECT 1 + 1').then(()=>{
    console.log("Query successfully tested !")
}).catch((err) =>{
    console.log("Error testing the query", err)
})


export default pool;
