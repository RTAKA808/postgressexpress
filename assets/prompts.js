

const menuPrompts=
    {
        type:'list',
        name:'menu',
        message:'Choose One of the Following',
        choices:['View All Departments', 'View All Roles', 'View All Employees','View Employees By Manager','Add A Department', 'Add a Role','Add An Employee','Update An Employee Role','Update An Employees Manager','Delete a Department','Delete a role','Delete Employee','View Department Budget','Quit']
        
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
    
  

module.exports={menuPrompts,
    
    addDepartmentPrompt,
    addRolePrompt,
    addEmployee}












