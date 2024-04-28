

const menuPrompts=
    {
        type:'list',
        name:'menu',
        message:'Choose One of the Following',
        choices:['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add a Role','Add An Employee','Update An Employee Role','Quit']
        
        }



const viewDepPrompt={
    type:'list',
    name:'viewDepartment',
    messaage:'Choose a Department to View',
    choices: 'allDepartmentChoices'
}


const viewRolesPrompt={
    type:'list',
    name:'viewRole',
    messaage:'Choose a Department to View',
    choices: 'allRoleChoices'
}

const viewEmployeesPrompt={
    type:'list',
    name:'viewEmployees',
    messaage:'Choose an Employee to View',
    choices: 'allEmployeeChoices'
}

const addDepartmentPrompt=
    {
        type:'input',
        name:'department',
        message:'Please Enter A Department: ',
        
    }

const addRolePrompt=[
    {
        type:'input',
        name:'role',
        message:'Enter the Name of the Role: ',
        
    },
    {
        type:'number',
        name:'salary',
        message:'Please Enter Salary: '
    },
    {
        type:'list',
        name:'deptNameList',
        message:'Please Select the Department You Want to Add the Role to: ',
        choices:[]
    },
]



const addEmployee=[
    {
        type:'input',
        name:'firstName',
        message:'First Name: ',
    
    },
    {
    type:'input',
    name:'lastName',
    message:'Last Name: ',
    
    },
    {
        type:'number',
        name:'salary',
        message:'Please Enter Salary: '
    },
    {
        type:'list',
        name:'roleNameList',
        message:'Please Select the Employees Role:',
        choices:[]
    },
    {
        type:'list',
        name:'manager',
        message:'Who Is the Employees Manager?: ',
        choices:[]
    }

]
    
const updateEmployeePrompt=[
    {
        type:'list',
        name:'update',
        message:'Choose an Employee to Update: ',
        choices:[]
    },
    {
        type:'list',
        name:'updateRole',
        message:'Please Select the New Role for the Selected Employee: ',
        choices:[]
    }
]
  

module.exports={menuPrompts,
    viewDepPrompt,
    viewRolesPrompt,
    viewEmployeesPrompt,
    addDepartmentPrompt,
    addRolePrompt,
    addEmployee,
    updateEmployeePrompt }












