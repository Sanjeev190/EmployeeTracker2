const fs=require('fs');
const inquirer=require('inquirer');
const { default: Choices } = require('inquirer/lib/objects/choices');
const{ Pool }=require('pg');
const department=require('./getdepartment.js');
const role=require('./getrole.js');
const manager=require('./getmanager.js');
const updateEmployeeRole=require('./updateEmployeerole.js');
const pool=new Pool 
({
   
    user: 'postgres',
    password: '1234',
    host: 'localhost',
    database: 'employee_db'
}
)
pool.connect();

 
const tracking=(data)=>{
if (data.action==='view all department'){
    pool.query('SELECT * FROM department', function (err, { rows }) {
        console.table(rows)}

    ) }
    else 
    if (data.action==='view all roles'){
        pool.query(
            `SELECT role.id,role.title,role.salary,department.name FROM role
             JOIN department
              ON role.department_id=department.id`,(err,{rows})=>{
            console.table(rows)
        })


    } else
     if (data.action==='view all employees'){
        pool.query(
            `SELECT employee.id,employee.first_name,employee.last_name,
            role.title AS job_titles,role.salary,department.name AS
             department,role.salary ,
             CONCAT(manager.first_name, ' ', manager.last_name) AS manager
             FROM employee
             JOIN role ON employee.role_id=role.id
             JOIN 
            department ON role.department_id = department.id`
             ,(err,{rows})=>{
                console.table(rows)
             })

    }else 
      if (data.action==='add a department'){
        inquirer
        .prompt({
            type:'input',
            name:'department',
            message:'what is the name of the department?'
        })
        .then((answer)=>{
            pool.query('INSERT INTO department (name) VALUES ($1)',[answer.department],(err,{rows})=>{
                if (err) {
                    console.log(err);
                  }else{
                    pool.query('SELECT * FROM department', (err, { rows })=> {
                    console.table(rows)}
                    

              )}
            })

        })
    } else
      if (data.action==='add a role'){
        inquirer.prompt([{
            type:'input',
            name:'title',
            message:'what is the title of the role?'
        },
        {
            type:'input',
            name:'salary',
            message:'what is the salry of the role'
        },
        {
            type:'list',
            name:'department',
            mesaage:'what department does the role belong to?',
            choices:department
            
        }
    ]).then((answer)=>{
        console.log(answer.department)
        pool.query(`INSERT INTO role (title, salary, department_id) VALUES ($1, $2, (SELECT id FROM department WHERE name = $3))`, [answer.title, answer.salary, answer.department], (err, { rows }) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Role added sucessfully in the database')     // Further processing
            }
        });
    })
 }
  else 
    if (data.action==='add an employee'){
        inquirer.prompt([{
            type:'input',
            name:'first_name',
            message:'what is the first name of the employee?'
        },
        {
            type:'input',
            name:'last_name',
            message:'what is the last name of the employee?'
        },
        {
            type:'list',
            name:'role',
            message:'what is the role of the employee?',
            choices:role

    },
    {
        type:'list',
        name :'manager',
        message:'who is the manger of the employee?',
        choices:[{ name: 'None', value: null }].concat(employees.map(employee => ({ name: employee.first_name + ' ' + employee.last_name, value: employee.id })))

    }]).then((answer)=>{
        pool.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, (SELECT id FROM role WHERE title = $3), $4)`, [answer.first_name, answer.last_name, answer.role, answer.manager], (err, { rows }) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Employee added sucessfully in the database')     // Further processing
            }
        })
    })}
    else 
    if (data.action==='update an employee role'){
        updateEmployeeRole();



    }
    // else 
    // if (data.action==='quit'){
    //     pool.end();


}

module.exports=tracking;
