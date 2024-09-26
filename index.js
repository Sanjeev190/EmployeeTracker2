
const{ Pool }=require('pg');
const pool=require('./pool.js')
const inquirer = require('inquirer');
pool.connect();
const{ viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole }=require('./tracker.js')
// Main menu
function mainMenu() {
  inquirer
    .prompt({
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    })
    .then((response) => {
      switch (response.choice) {
        case 'View all departments':
          viewDepartments(mainMenu);
         
          break;
        case 'View all roles':
          viewRoles(mainMenu);
          break;
        case 'View all employees':
          viewEmployees(mainMenu);
        
          break;
        case 'Add a department':
          addDepartment(mainMenu);
          
          break;
        case 'Add a role':
          addRole(mainMenu);
         
          break;
        case 'Add an employee':
          addEmployee(mainMenu);
      
          break;
        case 'Update an employee role':
          updateEmployeeRole(mainMenu);
       
          break;
        case 'Exit':
          pool.end();
          break;
      }
    });
}
mainMenu();
// View departments
