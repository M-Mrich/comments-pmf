const { response } = require('express');
const e = require('express');

const Pool = require('pg').Pool;
require("dotenv").config();const isProduction = process.env.NODE_ENV === 
"production";const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});

//GET requests on USER table

const getUsers = (request,response)=>{
    pool.query('SELECT * FROM comments ORDER BY id ASC',(error, results)=>{
        if(error){
            throw error;
        }
        // console.log(response);
        response.status(200).json(results.rows);
    })
}

// /users/:id

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query(`SELECT * FROM comments WHERE id = ${id}`,(error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }


// POST req on USER table
const createUser = (request, response) => {
    console.log(request.body)
    const { name, email, comment } = request.body
    
    pool.query('INSERT INTO comments (name, email, comment) VALUES ($1, $2, $3)', [name, email, comment], (error, result) => {
      if (error) {
        throw error
      }
    //   console.log(result);
      response.status(201).send(`User added with ID: ${result.insertId}`)
    })
  }


  const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email, comment } = request.body
  
    pool.query(
      'UPDATE users SET name = $1, email = $2, comment = $3 WHERE id = $4',
      [name, email, comment, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }

  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }



module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }