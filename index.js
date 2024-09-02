const inquirer=require('inquirer');
const fs=require('fs');
const tracking=require('./tracker.js');
const department=require('./getdepartment.js');
const{ Pool }=require('pg');



function promptUser() {
    inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'What do you want to do?',
      choices: [
        'view all department',
        'view all roles',
        'view all employees',
        'add a department',
        'add a role',
        'add an employee',
        'update an employee role',
        'quit'
      ]
    }).then((answer) => {
        // console.log(answer)
    tracking(answer)
    promptUser();
    if (answer.action==='quit'){
        Pool.end();
        return;
    }     
    
})
}

promptUser();
    
