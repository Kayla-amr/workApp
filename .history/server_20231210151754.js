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
        dueDate: '2021-01-01',
        status: false,
        equipment: [ 'cement', 'trailer', 'truck' ],
        employees:['John Doe', 'Steve Smith'],
        cost: 1234.56
    },
    {
        id: 2,
        name: 'Project 2',
        description: 'This is a project description',
        dueDate: '2021-01-01',
        status: true,
        equipment: [ 'cement', 'trailer', 'truck' ],
        employees:['Jane Doe', 'Steve Smith'],
        cost: 1234.56
    },
    {
        id: 3,
        name: 'Project 3',
        description: 'This is a project description',
        dueDate: '2021-01-01',
        status: false,
        equipment: [ 'cement', 'trailer', 'truck' ],
        employees:['John Doe', 'Jane Doe'],
        cost: 1234.56
    }
];


/*EMPLOYEES*/
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



/*EQUIPMENT*/
app.get('/api/equipment', (req, res) => {
    res.json(equipment);
}
);

app.get('/api/equipment/:id', (req, res) => {
    const equipment = equipment.find(e => e.id === parseInt(req.params.id));
    if (equipment) {
        res.json(equipment);
    } else {
        res.status(404).send('Equipment not found');
    }
}
);

app.post('/api/equipment', (req, res) => {
    let newEquipment = {
        id: equipment.length + 1,
        name: req.body.name,
    };

    equipment.push(newEquipment);
    res.json(equipment);
}
);

app.put('/api/equipment/:id', (req, res) => {
    let equipment = equipment.find(equipment => equipment.id === parseInt(req.params.id));

    if (equipment) {
        equipment.name = req.body.name;
        res.json(equipment);
    } else {
        res.status(404).send(`Equipment ${req.params.id} does not exist`);
    }
}
);

app.delete('/api/equipment/:id', (req, res) => {
    let newEquipment = equipment.filter(equipment => equipment.id !== parseInt(req.params.id));

    if(newEquipment.length < equipment.length) {
        equipment = newEquipment;
        res.json(equipment);
    } else {
        res.status(404).send(`Equipment ${req.params.id} does not exist`);
    }
}
);




/*PROJECTS*/
app.get('/api/projects', (req, res) => {
    res.json(projects);
}
);

app.get('/api/projects/:id', (req, res) => {
    const project = projects.find(e => e.id === parseInt(req.params.id));
    if (project) {
        res.json(project);
    } else {
        res.status(404).send('Project not found');
    }
}
);

app.post('/api/projects', (req, res) => {
    let newProject = {
        id: projects.length + 1,
        name: req.body.name,
        description: req.body.description,
        dueDate: req.body.dueDate,
        status: false,
        equipment: req.body.equipment,
        employees: req.body.employees,
        cost: req.body.cost
    };

    projects.push(newProject);
    res.json(projects);
}
);

app.put('/api/projects/:id', (req, res) => {
    let project = projects.find(project => project.id === parseInt(req.params.id));

    if (project) {
        project.name = req.body.name;
        project.description = req.body.description;
        project.equipment = req.body.equipment;
        project.employees = req.body.employees;
        project.cost = req.body.cost;
        res.json(projects);
    } else {
        res.status(404).send(`Project ${req.params.id} does not exist`);
    }
}
);

app.delete('/api/projects/:id', (req, res) => {
    let newProject = projects.filter(project => project.id !== parseInt(req.params.id));

    if(newProject.length < projects.length) {
        projects = newProject;
        res.json(projects);
    } else {
        res.status(404).send(`Project ${req.params.id} does not exist`);
    }
}
);





app.listen(port, () => console.log(`Server listening on port http://localhost:${port}`));

