const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('client'));

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

app.get('/api/employees', (req, res) => {
    res.json(employees);
});

app.get('/api/employees/:id', (req, res) => {
    const employee = employees.find(e => e.id === parseInt(req.params.id));
    if (employee) {
        res.json(employee);
    } else {
        res.status(404).send('Employee not found');
    }
});

app.post('/api/employees', (req, res) => {
    let newEmployee = {
        id: employees.length + 1,
        name: req.body.name,
        title: req.body.title,
        pay: req.body.pay
    };

    employees.push(newEmployee);
    res.json(employees);
});

app.put('/api/employees/:id', (req, res) => {
    let employee = employees.find(employee => employee.id === parseInt(req.params.id));

    if (employee) {
        employee.name = req.body.name;
        employee.title = req.body.title;
        employee.pay = req.body.pay;
        res.json(employees);
    } else {
        res.status(404).send(`Employee ${req.params.id} does not exist`);
    }
});

app.delete('/api/employees/:id', (req, res) => {
    let newEmployee = employees.filter(employee => employee.id !== parseInt(req.params.id));

    if(newEmployee.length < employees.length) {
        employees = newEmployee;
        res.json(employees);
    } else {
        res.status(404).send(`Employee ${req.params.id} does not exist`);
    }
});




app.listen(port, () => console.log(`Server listening on port http://localhost:${port}`));
