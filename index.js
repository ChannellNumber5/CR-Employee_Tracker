
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table')

//copies, updates, and refactors code from my teamProfile Generator https://github.com/ChannellNumber5/CR-TeamProfileGenerator
function init(){
    inquirer
        .prompt([
            {type:"input",
            name: "managerName",
            message: "Hello Team Manager! Please Enter your Name:"
            },
            {type:"number",
            name: "managerId",
            message: "Please Enter your Employee ID Number:"
            },
            {type:"input",
            name: "managerEmail",
            message: "Please Enter your Email Address:"
            },
            {type:"number",
            name: "managerOfficeNumber",
            message: "Please Enter your Office Number:"
            },
        ])
        .then((data) => {
            if (data.managerName === undefined || data.managerId === undefined || data.managerEmail === undefined|| data.managerOfficeNumber === undefined){
                console.log(data)
                console.log("Please rerun script and input correct data for name, ID, email and Office Number");
                init();
            } else {
                const manager = new Manager(data.managerName, data.managerId, data.managerEmail, data.managerOfficeNumber)
                teamList.push(manager);
                teamMenu();
            }
        })
    }
    
    function runMenu() {
        inquirer
        .prompt([
            {type:"list",
            name: "toDoNext",
            message: "Please select from the following options:",
            choices:["View all Departments", "View all Roles", "View all Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role"]
            }
        ])
        .then((data) => {
            if(data.toDoNext === "View all Departments") {
                viewAllDepartments();
            } else if (data.toDoNext === "View all Roles") {
                viewAllRoles();
            } else if (data.toDoNext === "View all Employees") {
                viewAllEmployees();
            } else if (data.toDoNext === "Add a Department") {
                addDepartment();
            } else if (data.toDoNext === "Add a Role") {
                addRole();
            } else if (data.toDoNext === "Add an Employee") {
                addEmployee();
            } else if (data.toDoNext === "Update an Employee Role") {
                updateEmployee();
            } else {
                console.log("Thank you for using the Employee Tracker Application!")
            }
        });
    
    }

    function viewAllDepartments(){

    }
    
    function createIntern() {
        inquirer
            .prompt([
                {type:"input",
                name: "internName",
                message: "New Intern Employee Card Creation Mode: \n Please Enter the Intern's Name:"
                },
                {type:"number",
                name: "internId",
                message: "Please Enter the Intern's Employee ID Number:"
                },
                {type:"input",
                name: "internEmail",
                message: "Please Enter the Intern's Email Address:"
                },
                {type:"input",
                name: "school",
                message: "Please Enter the Intern's Current School/University:"
                },
            ])
            .then((data) => {
                const intern = new Intern(data.internName, data.internId, data.internEmail, data.school)
                teamList.push(intern);
                teamMenu();
            })
    }
    
    function createEngineer() {
        inquirer
            .prompt([
                {type:"input",
                name: "engName",
                message: "New Engineer Employee Card Creation Mode: \n Please Enter the Engineer's Name:"
                },
                {type:"number",
                name: "engId",
                message: "Please Enter the Engineer's Employee ID Number:"
                },
                {type:"input",
                name: "engEmail",
                message: "Please Enter the Engineer's Email Address:"
                },
                {type:"input",
                name: "github",
                message: "Please Enter the Engineer's Github Username:"
                },
            ])
            .then((data) => {
                const engineer = new Engineer(data.engName, data.engId, data.engEmail, data.github)
                teamList.push(engineer);
                teamMenu();
            });
    }
    
    function deleteEmployee() {
        inquirer
        .prompt([
            {type: "list",
            name: "toDelete",
            message: "Which Team Member would you like to Delete?",
            choices: teamList}
        ])
        .then(async (data) => {
            for(let i = 0; i < teamList.length; i++) {
                if (i !== 0 && data[i] === data.toDelete) {
                    teamList.splice(i, 1);
                    teamMenu();
                    return;
                } else if (i === 0 && data[i] === data.toDelete) {
                   await changeManager();
                }
            }
        })
    }
    
    function changeManager() {
        inquirer
        .prompt([
            {type:"input",
            name: "managerName",
            message: "Reacreating Team Manager Profile! \n Please Enter your Name:"
            },
            {type:"number",
            name: "managerId",
            message: "Please Enter your Employee ID Number:"
            },
            {type:"input",
            name: "managerEmail",
            message: "Please Enter your Email Address:"
            },
            {type:"number",
            name: "managerOfficeNumber",
            message: "Please Enter your Office Number:"
            },
        ])
        .then((data) => {
            if (data.managerName === undefined || data.managerId === undefined || data.managerEmail === undefined|| data.managerOfficeNumber === undefined){
                console.log(data)
                console.log("Please input correct data for name, ID, email and Office Number");
                changeManager();
            } else {
                teamList[1].name = data.managerName;
                teamList[1].id = data.managerId;
                teamList[1].email = data.managerEmail;
                teamList[1].officeNumber = data.managerOfficeNumber;
    
                teamMenu();
            }
        })
    }

    
    init();