 const updateEmployeeRole=()=> {
    pool.query('SELECT * FROM employees', (err, employees) => {
      if (err) throw err;
      pool.query('SELECT * FROM roles', (err, roles) => {
        if (err) throw err;
        inquirer.prompt([
          {
            type: 'list',
            name: 'employeeId',
            message: 'Select the employee to update:',
            choices: employees.map(employee => ({ name: employee.first_name + ' ' + employee.last_name, value: employee.id }))
          },
          {
            type: 'list',
            name: 'roleId',
            message: 'Select the new role for the employee:',
            choices: roles.map(role => ({ name: role.title, value: role.id }))
          }
        ]).then(answer => {
          connection.query('UPDATE employees SET role_id = ? WHERE id = ?', [answer.roleId, answer.employeeId], (err) => {
            if (err) throw err;
            console.log('Employee role updated successfully!');
            mainMenu();
          });
        });
      });
    });
  }
  module.exports=updateEmployeeRole;