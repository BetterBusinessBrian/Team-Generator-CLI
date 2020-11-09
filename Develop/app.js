const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
var employees = [];


// Start
console.log("Please build your team.")

// Function to add Manager (run first)
 async function addManager(){
let answers = await inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "What is your Manager's name?"
    },
    {
        type: 'input',
        name: "id",
        message: "What is your Manager's id?"
    },
    {
        type: 'input',
        name: "email",
        message: "What is your Manager's email?"
    },
    {
        type: 'input',
        name: "officeNumber",
        message: "What is your Manager's office number?"
    }
])
employees.push(new Manager(answers.name, answers.id, answers.email, answers.officeNumber))
}

// Function to add Engineer
async function addEngineer(){
    let answers = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your Engineer's name?"
        },
        {
            type: 'input',
            name: "id",
            message: "What is your Engineer's id?"
        },
        {
            type: 'input',
            name: "email",
            message: "What is your Engineer's email?"
        },
        {
            type: 'input',
            name: "gitHub",
            message: "What is your Engineers github username?"
        }
    ])
    employees.push(new Engineer(answers.name, answers.id, answers.email, answers.gitHub))
        addTeamMember();
    };

// Function to add Intern
    async function addIntern(){
        let answers = await inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is your Interns's name?"
            },
            {
                type: 'input',
                name: "id",
                message: "What is your Intern's id?"
            },
            {
                type: 'input',
                name: "email",
                message: "What is your Intern's email?"
            },
            {
                type: 'input',
                name: "school",
                message: "What is your Intern's school?"
            }
        ])
        employees.push(new Intern(answers.name, answers.id, answers.email, answers.school))
            addTeamMember();
        };

 async function addTeamMember(){
    let answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'toAdd',
            message:'What type of team member do you want to add?',
            choices: [
                'Engineer',
                'Intern',
                'I do not want to add any more team members'
            ]
        }
    ])
        console.log(answers.toAdd);
        if(answers.toAdd === 'Engineer'){
             await addEngineer();
        }
        if(answers.toAdd === 'Intern'){
            await addIntern();
        }
        if(answers.toAdd === 'I do not want to add any more team members'){
            await console.log("OK! Enjoy your new roster.")
            console.log(employees);
            const teamPage = render(employees);
            fs.writeFile('../Output/team.html', teamPage, err => {
                if (err){
                    throw err
                }
            });
        } else{
            console.log('error')
        }
    }



async function buildTeam() {
    await addManager();
    await addTeamMember();
}

buildTeam();

