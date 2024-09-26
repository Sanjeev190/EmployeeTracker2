const{ Pool }=require('pg');
const pool=require('./pool.js')
const inquirer = require('inquirer');

pool.connect();

function viewDepartments(functionback) {
    pool.query('SELECT * FROM department', (err, res) => {
      if (err) throw err;
      console.table(res.rows);
      functionback()
    });
  }
  
  // View roles
  function viewRoles(functionback) {
    const query = `
      SELECT role.id, role.title, department.name AS department, role.salary
      FROM role
      LEFT JOIN department ON role.department_id = department.id;
    `;
    pool.query(query, (err, res) => {
      if (err) throw err;
      console.table(res.rows);
      functionback()
      
    });
  }
  
  // View employees
  function viewEmployees(functionback) {
    const query = `
      SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary,
             COALESCE(manager.first_name || ' ' || manager.last_name, 'None') AS manager
      FROM employee
      LEFT JOIN role ON employee.role_id = role.id
      LEFT JOIN department ON role.department_id = department.id
      LEFT JOIN employee manager ON employee.manager_id = manager.id;
    `;
    pool.query(query, (err, res) => {
      if (err) throw err;
      console.table(res.rows);
      functionback()
    });
  }
  
  // Add a department
  function addDepartment(functionback) {
    inquirer
      .prompt({
        name: 'name',
        message: 'Enter the name of the department:'
      })
      .then((answer) => {
        pool.query('INSERT INTO department (name) VALUES ($1)', [answer.name], (err) => {
          if (err) throw err;
          console.log('Department added!');
          functionback();
        });
      });
  }
  
  // Add a role
  function addRole(functionback) {
  pool.query('SELECT * FROM department', (err, res) => {
      if (err) throw err;
  
      const departments = res.rows.map(({ id, name }) => ({ name, value: id }));
  
      inquirer
        .prompt([
          {
            name: 'title',
            message: 'Enter the role title:'
          },
          {
            name: 'salary',
            message: 'Enter the role salary:'
          },
          {
            type: 'list',
            name: 'department_id',
            message: 'Select the department for this role:',
            choices: departments
          }
        ])
        .then((answers)   => {
          pool.query(
            'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
            [answers.title, answers.salary, answers.department_id],
            (err) => {
              if (err) throw err;
              console.log('Role added!');
              functionback()
              
            }
          );
        });
    });
  }
  
  // Add an employee
  function addEmployee(functionback) {
    pool.query('SELECT * FROM role', (err, res) => {
      if (err) throw err;
  
      const roles = res.rows.map(({ id, title }) => ({ name: title, value: id }));
  
      pool.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
  
        const managers = res.rows.map(({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id
        }));
  
        managers.unshift({ name: 'None', value: null });
  
        inquirer
          .prompt([
            {
              name: 'first_name',
              message: 'Enter the employee\'s first name:'
            },
            {
              name: 'last_name',
              message: 'Enter the employee\'s last name:'
            },
            {
              type: 'list',
              name: 'role_id',
              message: 'Select the employee\'s role:',
              choices: roles
            },
            {
              type: 'list',
              name: 'manager_id',
              message: 'Select the employee\'s manager:',
              choices: managers
            }
          ])
          .then((answers) => {
            pool.query(
              'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
              [answers.first_name, answers.last_name, answers.role_id, answers.manager_id],
              (err) => {
                if (err) throw err;
                console.log('Employee added!');
                functionback()
                
              }
            );
          });
      });
    });
  }
  
  // Update employee role
  function updateEmployeeRole() {
    pool.query('SELECT * FROM employee', (err, res) => {
      if (err) throw err;
  
      const employees = res.rows.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));
  
      pool.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
  
        const roles = res.rows.map(({ id, title }) => ({ name: title, value: id }));
  
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'employee_id',
              message: 'Select the employee to update:',
              choices: employees
            },
            {
              type: 'list',
              name: 'role_id',
              message: 'Select the new role:',
              choices: roles
            }
          ])
          .then((answers) => {
            pool.query(
              'UPDATE employee SET role_id = $1 WHERE id = $2',
              [answers.role_id, answers.employee_id],
              (err) => {
                if (err) throw err;
                console.log('Employee role updated!');
                functionback()
                
              }
            );
          });
      });
    });
  }

 
module.exports = { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole };