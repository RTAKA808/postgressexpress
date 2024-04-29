const { Pool } = require('pg');
const inquirer= require('inquirer')
const {menuPrompts,
  addDepartmentPrompt,
  addRolePrompt,
  addEmployee}=require('./assets/prompts')


const pool = new Pool(
    {
      user: 'postgres',
      password: '8336',
      host: 'localhost',
      database: 'employees_db',
      port:5432
    },
    console.log(`Connected to the employeesDb database.`)
  )
  
  pool.connect();

mainMenu()

  function mainMenu(){
    inquirer.prompt(menuPrompts).then(answers=>{
      switch(answers.menu){
        case 'View All Departments':
          viewAllDepartments();
          break;
        case 'View All Roles':
          viewAllRoles();
          break;
        case 'View All Employees':
          viewAllEmployees();
          break;
        case 'Add A Department':
          addNewDepartment();
          break;
        case 'Add a Role':
          addNewRole();
          break;
        case 'Add An Employee':
          addNewEmployee();
          break;
        case 'Update An Employee Role':
          updateEmployee();
          break;
        case 'Quit':
          console.log('Exiting Employee Database...');
          process.exit();
          break;
    }
      }
  )}

function viewAllDepartments(){
  pool.query('SELECT * FROM department',
  function(err,res){
    if (err){
      console.log(err);
    }else{
    console.table(res.rows);
     } mainMenu();
});
};


function viewAllRoles(){
pool.query(`SELECT roles.id, roles.job_title, department.department_name, roles.salary 
FROM department 
LEFT JOIN roles 
ON department.id=department_id`,
(err,res)=>{
  if (err){
    console.log(err);
  }else{
    console.table(res.rows);
     } mainMenu();
  
}
)}

function viewAllEmployees(){
pool.query(`SELECT
employees.id, employees.last_name,employees.first_name,  roles.job_title, department.department_name,roles.salary,CONCAT (employees.last_name,' ',employees.first_name) AS employee_name, CONCAT(manager.first_name,' ',manager.last_name)AS manager_name
FROM department
JOIN roles
ON department.id=roles.department_id
JOIN employees
ON roles.id=employees.role_id
LEFT JOIN employees manager 
ON employees.manager_id=manager.id;
`,
(err,res)=>{
  if (err){
    console.log(err);
  }else{
    console.table(res.rows);
     } mainMenu();
}
)}

function addNewDepartment(){
  inquirer.prompt(addDepartmentPrompt).then(answers=>{
pool.query(`INSERT INTO department (department_name)
VALUES ($1)`, [answers.department],
(err,res)=>{
  if (err){
    console.log(err);
  }else{
    console.log("Department Added Sucessfully");
    pool.query(`SELECT department.id,department.department_name FROM department WHERE department_name=($1)`,[answers.department],
    (err,res)=>{
      if (err){
        console.log(err);
      }else{
        console.table(res.rows)
     } 
     mainMenu();
});
}});
});
}   

function addNewRole(){
  pool.query(`SELECT id, department_name 
  FROM department`,
  (err,res)=>{//res comes back as an array of objects
    if(err){
      console.error(err);
      return;
      }
    let deptChoices=res.rows.map(dep=>({
      name:dep.department_name,
      value: dep.id
    })
); 
addRolePrompt[2].choices=deptChoices;//makes sure they use the right choices by putting them in the array

  inquirer.prompt(addRolePrompt).then(answers=>{
    pool.query(`INSERT INTO roles (job_title, salary, department_id)
    VALUES ($1,$2,$3)`, [answers.role, answers.salary,answers.deptNameList],
    (err,res)=>{
      if (err){
        return console.log(err);
      }
        console.log(`${answers.role} has been added to roles`)

     mainMenu();
    });
  })
});
}


function addNewEmployee(){
pool.query(`SELECT id, job_title FROM roles`,
(err,res)=>{
  if(err){
    console.error(err);
    return;
    }
  let roleList=res.rows.map(rol=>({
    name: rol.job_title,
    value: rol.id
  })
) 
addEmployee[2].choices=roleList;
pool.query(`SELECT id, first_name, last_name FROM employees`,
(err,res)=>{
  if(err){
    console.error(err);
    return;
    }
    let empList=res.rows.map(emp=>({
      name: `${emp.first_name} ${emp.last_name}`, 
      value: emp.id
    })
  )

  empList.push({name: 'none', value:null});
  addEmployee[3].choices=empList;

  inquirer.prompt(addEmployee).then(answers=>{
pool.query(`INSERT INTO employees (first_name, last_name , role_id, manager_id)
VALUES ($1,$2,$3, $4)`, [answers.firstName, answers.lastName,answers.roleNameList,answers.manager],
(err,res)=>{
  if (err){
    return console.log(err);
  }
    console.log(`${answers.firstName} ${answers.lastName} has been added to employees`)

 mainMenu();
        });
      });
    });
  });
};








function updateEmployee(){
    pool.query(`SELECT id,
    CONCAT (employees.last_name,' ',employees.first_name) 
    AS employee_name FROM employees `,(err, res) => {
        if (err){
            console.error(err)
        }
        let employee = res.rows.map((row) => ({
            name: row.employee_name,
            value: row.id
        }));

        pool.query(`SELECT id, job_title FROM roles`, (err, res) => {
            if (err){
                console.error(err)
            }
            let role = res.rows.map((row) =>({
                name: row.job_title,
                value: row.id
            }));

            const questions = [
                {
                    type:'list',
                    name: 'employee',
                    message:'SELECT EMPLOYEE',
                    choices: employee
                },
                {
                    type:'list',
                    name: 'newRole',
                    message:'SELECT THEIR NEW ROLE',
                    choices: role
                }
            ]
            inquirer.prompt(questions).then(answers => {
                pool.query(`UPDATE employees SET role_id = $1 WHERE id = $2`,
            [answers.newRole, answers.employee])
            .then(res => {
                console.log(`Employees Role Has Been Changed`)
                mainMenu();
            });
            });
        })
    });
};







