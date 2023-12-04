let employees = [
    {
        id: 1,
        name: 'John Doe',
        title: 'CEO',
        pay: 17.25
    },
    {
        id: 2,
        name: 'Steve Smith',
        title: 'CTO',
        pay: 15.75
    },
    {
        id: 3,
        name: 'Jane Doe',
        title: 'CFO',
        pay: 16.00
    }
];

let equipment = [
    {
        id: 1,
        name: 'cement',
    },
    {
        id: 2,
        name: 'trailer',
    },
    {
        id: 3,
        name: 'truck',
    }
];

let projects = [
    {
        id: 1,
        name: 'Project 1',
        description: 'This is a project description',
        equipment: [ 'cement', 'trailer', 'truck' ],
        employees:['John Doe', 'Steve Smith'],
        cost: 1234.56
    },
    {
        id: 2,
        name: 'Project 2',
        description: 'This is a project description',
        equipment: [ 'cement', 'trailer', 'truck' ],
        employees:['Jane Doe', 'Steve Smith'],
        cost: 1234.56
    },
    {
        id: 3,
        name: 'Project 3',
        description: 'This is a project description',
        equipment: [ 'cement', 'trailer', 'truck' ],
        employees:['John Doe', 'Jane Doe'],
        cost: 1234.56
    }
];

let employeeList = document.querySelector('.employee');
let projectList = document.querySelector('.project');
let equipmentList = document.querySelector('.equipment');

function createEmployeeLi(employee) {
    let li = document.createElement('li');
    li.setAttribute('id', employee.id);
    


function viewWork(employees) {
    employeeList.innerText = '';
   
    employees.forEach((employee) => {
        employee += `<li>${employee.name}</li>`;
    });

    document.querySelector('.employee').innerHTML = employee;
}

viewWork(employees)