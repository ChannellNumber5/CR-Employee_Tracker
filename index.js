
const inquirer = require('inquirer');
// const mysql = require('mysql2'); dont think I need this if I'm using sequelize...
const cTable = require('console.table')
const sequelize = require("./config/connection");

//copies, updates, and refactors code from my teamProfile Generator https://github.com/ChannellNumber5/CR-TeamProfileGenerator
    
function runMenu() {
    inquirer
    .prompt([
        {type:"list",
        name: "toDoNext",
        message: "Please select from the following options:",
        choices:["View all Departments", "View all Roles", "View all Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role", "Exit Application"]
        }
    ])
    .then(async (data) => {
        if(data.toDoNext === "View all Departments") {
           console.table(await viewAllDepartments());
            runMenu();
        } else if (data.toDoNext === "View all Roles") {
            console.table(await viewAllRoles());
            runMenu();
        } else if (data.toDoNext === "View all Employees") {
            console.table(await viewAllEmployees());
            runMenu();
        } else if (data.toDoNext === "Add a Department") {
            addDepartment();
            runMenu();
        } else if (data.toDoNext === "Add a Role") {
            addRole();
            runMenu();
        } else if (data.toDoNext === "Add an Employee") {
            addEmployee();
            runMenu();
        } else if (data.toDoNext === "Update an Employee Role") {
            updateEmployee();
            runMenu();
        } else {
            console.log("Thank you for using the Employee Tracker Application!")
        }
    });

}

async function viewAllDepartments() {
    const deptData = await sequelize.query("SELECT * FROM departments");
        const tableData = cTable.getTable(deptData[1]);
        return tableData;
}

async function viewAllRoles() {
    const rolesData = await sequelize.query("SELECT roles.id AS role_id, roles.title, departments.dept_name, roles. salary  FROM departments INNER JOIN roles ON departments.id=roles.dept_id");
    const tableData = cTable.getTable(rolesData[1]);
    return tableData;
}

async function viewAllEmployees() {
    const empData = await sequelize.query("SELECT c.id, c.first_name, c.last_name, roles.title, roles.salary, departments.dept_name, CONCAT(r.first_name,' ',r.last_name) AS manager FROM employees c INNER JOIN roles ON roles.id=c.role_id INNER JOIN departments ON departments.id=roles.dept_id LEFT JOIN employees r ON r.id=c.manager_id;");
    const tableData = cTable.getTable(empData[1]);
    return tableData;
}

async function viewAllEmployeesAndRoles() {
    const empData = await sequelize.query("SELECT employees.first_name, employees.last_name, roles.title FROM roles INNER JOIN employees ON roles.id=employees.role_id");
    const tableData = cTable.getTable(empData[1]);
    return tableData;
}

//Not sure what to do with these have this idea to keep any asynchronous fetches to their own function, so only have to deal with the promise once...
// async function getcurrentDepartments () {
//     const roles = await sequelize.query('SELECT title FROM roles')
// }

// async function getcurrentRoles () {
//     const roles = await sequelize.query('SELECT title FROM roles')
// }
// async function getcurrentEmployees () {
//     const roles = await sequelize.query('SELECT title FROM roles')
// }

// function addDepartment() {
//     inquirer
//         .prompt([
//             {type:"input",
//             name: "newDept",
//             message: "Creating New Department \n Please Enter New Department Name:"
//             },
//         ])
//         .then((data) => {
//             // const newDept = new Intern(data.internName, data.internId, data.internEmail, data.school)
//             // teamList.push(intern);
//             // teamMenu();
//         })
// }

// function addRole() {
//     inquirer
//         .prompt([
//             {type:"input",
//             name: "title",
//             message: "Creating Role \n Please Enter Role Title:"
//             },
//             {type:"number",
//             name: "salary",
//             message: "What is the salary for this role?"
//             },
//             {type:"list",
//             name: "roleDept",
//             message: "What department does this role belong to?",
//             choices:[]
//             },
//         ])
//         .then((data) => {
//             // const newDept = new Intern(data.internName, data.internId, data.internEmail, data.school)
//             // teamList.push(intern);
//             // teamMenu();
//         })
// }
// function addEmployee() {
//     inquirer
//         .prompt([
//             {type:"input",
//             name: "first_name",
//             message: "Adding New Employee \n Please Enter Employee's First Name:"
//             },
//             {type:"input",
//             name: "last_name",
//             message: "Adding New Employee \n Please Enter Employee's Last Name:"
//             },
//             {type:"list",
//             name: "role",
//             message: "What is this employees role?",
//             choices:[]
//             },
//             {type:"list",
//             name: "manager",
//             message: "Who is this employee's manager?",
//             choices:[]
//             },
//         ])
//         .then((data) => {
//             const newDept = new Intern(data.internName, data.internId, data.internEmail, data.school)
//             teamList.push(intern);
//             teamMenu();
//         })
// }


// function deleteEmployee() {
//     inquirer
//     .prompt([
//         {type: "list",
//         name: "toDelete",
//         message: "Which Team Member would you like to Delete?",
//         choices: teamList}
//     ])
//     .then(async (data) => {
//         for(let i = 0; i < teamList.length; i++) {
//             if (i !== 0 && data[i] === data.toDelete) {
//                 teamList.splice(i, 1);
//                 teamMenu();
//                 return;
//             } else if (i === 0 && data[i] === data.toDelete) {
//                 await changeManager();
//             }
//         }
//     })
// }

// function changeManager() {
//     inquirer
//     .prompt([
//         {type:"input",
//         name: "managerName",
//         message: "Reacreating Team Manager Profile! \n Please Enter your Name:"
//         },
//         {type:"number",
//         name: "managerId",
//         message: "Please Enter your Employee ID Number:"
//         },
//         {type:"input",
//         name: "managerEmail",
//         message: "Please Enter your Email Address:"
//         },
//         {type:"number",
//         name: "managerOfficeNumber",
//         message: "Please Enter your Office Number:"
//         },
//     ])
//     .then((data) => {
//         if (data.managerName === undefined || data.managerId === undefined || data.managerEmail === undefined|| data.managerOfficeNumber === undefined){
//             console.log(data)
//             console.log("Please input correct data for name, ID, email and Office Number");
//             changeManager();
//         } else {
//             teamList[1].name = data.managerName;
//             teamList[1].id = data.managerId;
//             teamList[1].email = data.managerEmail;
//             teamList[1].officeNumber = data.managerOfficeNumber;

//             teamMenu();
//         }
//     })
// }

runMenu();