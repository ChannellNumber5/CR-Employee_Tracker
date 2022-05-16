
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
            // runMenu();
        } else if (data.toDoNext === "Add a Role") {
            addRole();
            // runMenu();
        } else if (data.toDoNext === "Add an Employee") {
            addEmployee();
            // runMenu();
        } else if (data.toDoNext === "Update an Employee Role") {
            updateEmployee();
            // runMenu();
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

async function viewAllData() {
    console.log("Current Departments: ");
    console.log(await getCurrentDepartments());
    console.log(parseSqlData(await getCurrentDepartments()));
    console.log("Current Roles: ");
    console.log(await getCurrentRoles());
    console.log(parseSqlData(await getCurrentRoles()));
    console.log("Current Employees: ");
    console.log(await getCurrentEmployees());
    console.log(parseSqlData(await getCurrentEmployees()));

}

//Not sure what to do with these have this idea to keep any asynchronous fetches to their own function, so only have to deal with the promise once...
async function getCurrentDepartments () {
    const data = await sequelize.query('SELECT id, dept_name FROM departments ORDER BY dept_name');
    const departments = data[1];
    let deptInfo = [];
    for (let i = 0; i < departments.length; i++) {
        deptInfo.push([departments[i].id, departments[i].dept_name]);
    }
    return deptInfo;
}

async function getCurrentRoles () {
    const data = await sequelize.query('SELECT id, title FROM roles');
    const roles = data[1];
    let roleInfo = [];
    for (let i = 0; i < roles.length; i++) {
        roleInfo.push([roles[i].id, roles[i].title]);
    }
    return roleInfo;
}
async function getCurrentEmployees () {
    const data = await sequelize.query('SELECT id, first_name, last_name FROM employees');
    const employees = data[1];
    let empInfo = [];
    for (let i = 0; i < employees.length; i++) {
        empInfo.push([employees[i].id, employees[i].first_name + " " + employees[i].last_name]);
    }
    return empInfo;
}

function parseSqlData (data) {
    let dataIds=[];
    let dataTitles=[];
    for(let i=0; i < data.length; i++){
        dataIds.push(data[i][0]);
        dataTitles.push(data[i][1]);
    }
    return [dataIds, dataTitles];
}

function addDepartment() {
    inquirer
        .prompt([
            {type:"input",
            name: "newDept",
            message: "Creating New Department \n Please Enter New Department Name:"
            }
        ])
        .then((data) => {
            if (data.newDept === null || data.newDept === " ") {
                console.log("Please enter valid Department Name");
                addDepartment()
            } else {
                const trimmedData = data.newDept.trimStart().trimEnd();
                sequelize.query(`INSERT INTO departments (dept_name) VALUES ("${trimmedData}")`);
                console.log(`New department ${trimmedData} added! \n`);
                runMenu();
            }
        });
        
}

async function addRole() {
    const deptInfo = parseSqlData(await getCurrentDepartments());
    const deptIds = deptInfo[0];
    const deptNames = deptInfo[1];
    inquirer
        .prompt([
            {type:"input",
            name: "title",
            message: "Creating Role \n Please Enter Role Title:"
            },
            {type:"number",
            name: "salary",
            message: "What is the salary for this role?"
            },
            {type:"list",
            name: "roleDept",
            message: "What department does this role belong to?",
            choices: deptNames
            },
        ])
        .then((data) => {
                if (data.title === null || data.title === " " || data.salary === null || data.salary === " " || typeof(data.salary) !== "number") {
                    console.log("Please enter valid role title or salary");
                    addRole()
                } else {
                    const title = data.title.trimStart().trimEnd();
                    const salary = data.salary;
                    const roleDept = data.roleDept;
                    let index;
                    for(let i = 0; i < deptNames.length; i++){
                        if (roleDept === deptNames[i]){
                            index = i;
                        }
                    }
                    sequelize.query(`INSERT INTO roles (title, salary, dept_id) VALUES ("${title}", ${salary}, ${deptIds[index]})`);
                    console.log(`New role ${title} added! \n`);
                    runMenu();
                }
        });
        
}

async function addEmployee() {
    const roleInfo = parseSqlData(await getCurrentRoles());
    const roleIds = roleInfo[0];
    const roleNames = roleInfo[1];

    const empInfo = parseSqlData(await getCurrentEmployees());
    const empIds = empInfo[0];
    const empNames = empInfo[1];
    empIds.push("null");
    empNames.push("No Manager");

    inquirer
        .prompt([
            {type:"input",
            name: "first_name",
            message: "Adding New Employee \n Please Enter Employee's First Name:"
            },
            {type:"input",
            name: "last_name",
            message: "Please Enter Employee's Last Name:"
            },
            {type:"list",
            name: "role",
            message: "What is this employees role?",
            choices: roleNames
            },
            {type:"list",
            name: "manager",
            message: "Who is this employee's manager?",
            choices: empNames
            },
        ])
        .then((data) => {
            if (data.first_name === null || data.first_name === " " || data.last_name === null || data.last_name === " ") {
                console.log("Please employee first and/or last name cannot be blank");
                addEmployee()
            } else {
                const first_name = data.first_name.trimStart().trimEnd();
                const last_name = data.last_name.trimStart().trimEnd();
                const role = data.role;
                const manager = data.manager;
                let index1;
                let index2;
                for (let i = 0; i < roleNames.length; i++){
                    if (role === roleNames[i]) {
                        index1 = i;
                    }
                }
                for (let i = 0; i < empNames.length; i++){
                    if (manager === empNames[i]) {
                        index2 = i;
                    }
                }
                sequelize.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${first_name}", "${last_name}", ${roleIds[index1]}, ${empIds[index2]})`);
                console.log(`New employee ${first_name} ${last_name} added! \n`);
                runMenu();
            }
        })
}



runMenu();

// viewAllData();