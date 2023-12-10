async function getData(projectId){
    const response = await fetch(`/api/projects/${projectId}`);
    const project = await response.json();

    const employeesResponse = await fetch('/api/employees');
    const employees = await employeesResponse.json();

    const equipmentResponse = await fetch('/api/equipment');
    const equipment = await equipmentResponse.json();

    displayProjectDetails(project);

    selectEmployee(employees);
    selectEquipment(equipment);
}


window.onload = function() {
const params = new URLSearchParams(window.location.search);
const projectId = parseInt(params.get('id'));
if (!isNaN(projectId)) {
    getData(projectId);
} else {
    console.error("Invalid project ID");
}
}

function getProjectById(id) {
return projects.find(project => project.id === id);
}

function displayProjectDetails(project) {
const projectDetailsDiv = document.querySelector('.projectDetails');

if (project) {
    projectDetailsDiv.innerHTML = `
        <h2 class="projectName">${project.name}</h2>
        <h3 class="projectDesc">${project.description}</h3>
        <p class="projectDate">${project.dueDate}</p>
        <p class="projectEquipment">${project.equipment}</p>
        <p class="projectEmployees">${project.employees}</p>
        <p class="projectCost">${project.cost}</p>
        <button class="editProject">Edit</button>
    `
    projectDetailsDiv.appendChild(createDeleteButton(project.id))
    ;

    document.querySelector('.editProject').addEventListener('click', () => enableEditMode(project));
}
}
function selectEmployee(employees, selectedEmployeeIds) {
    const employeeContainer = document.querySelector('.editProjectEmployees');

    if (!employeeContainer) {
        console.error('Employee container element not found');
        return;
    }

    employeeContainer.innerHTML = ''; // Clear existing options

    employees.forEach(employee => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = employee.id;
        checkbox.checked = selectedEmployeeIds && selectedEmployeeIds.includes(employee.id);

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(employee.name));
        employeeContainer.appendChild(label);
    });
}



function selectEquipment(equipment, selectedEquipmentIds) {
    const equipmentContainer = document.querySelector('.editProjectEquipment');

    if (!equipmentContainer) {
        console.error('Equipment container element not found');
        return;
    }

    equipmentContainer.innerHTML = ''; // Clear existing options

    equipment.forEach(equipment => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = equipment.id;
        checkbox.checked = selectedEquipmentIds && selectedEquipmentIds.includes(equipment.id);

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(equipment.name));
        equipmentContainer.appendChild(label);


    });
}



async function enableEditMode(project) {
    const projectDetailsDiv = document.querySelector('.projectDetails');

    try {
        const employeesResponse = await fetch('/api/employees');
        if (!employeesResponse.ok) throw new Error('Failed to fetch employees');
        const employees = await employeesResponse.json();

        const equipmentResponse = await fetch('/api/equipment');
        if (!equipmentResponse.ok) throw new Error('Failed to fetch equipment');
        const equipment = await equipmentResponse.json();

        // First, set the inner HTML for edit mode
        projectDetailsDiv.innerHTML = `
            <input class="editProjectName" type="text" value="${project.name}">
            <textarea class="editProjectDesc">${project.description}</textarea>
            <input class="editProjectDate" type="date" value="${project.dueDate}">
            <div class="editProjectEmployees"></div>
<div class="editProjectEquipment"></div>

            <input class="editProjectCost" type="text" value="${project.cost}">
            <button class="saveProjectChanges">Save Changes</button>
        `;

        // Then, populate the dropdowns 
        selectEmployee(employees, project.employees);
        selectEquipment(equipment, project.equipment);

        document.querySelector('.saveProjectChanges').addEventListener('click', () => saveChanges(project));
    } catch (error) {
        console.error('Error in enableEditMode:', error);
    }
}


function setDropdownValue(selector, value) {
    const selectElement = document.querySelector(selector);
    if (Array.isArray(value)) {
        selectElement.querySelectorAll('option').forEach(option => {
            option.selected = value.includes(option.value);
        });
    } else {
        selectElement.value = value;
    }
}

function saveChanges(project) {
    project.name = document.querySelector('.editProjectName').value;
    project.description = document.querySelector('.editProjectDesc').value;
    project.dueDate = document.querySelector('.editProjectDate').value;
    
    const selectedEmployees = [];
    document.querySelectorAll('.editProjectEmployees input[type=checkbox]:checked').forEach(checkbox => {
        selectedEmployees.push(parseInt(checkbox.value));
    });
    project.employees = selectedEmployees;

    const selectedEquipment = [];
    document.querySelectorAll('.editProjectEquipment input[type=checkbox]:checked').forEach(checkbox => {
        selectedEquipment.push(parseInt(checkbox.value));
    });
    project.equipment = selectedEquipment;

    project.cost = document.querySelector('.editProjectCost').value;

    updateProject(project);
}


function createDeleteButton(projectId) {
const deleteButton = document.createElement('button');
deleteButton.innerText = 'Delete';
deleteButton.classList.add('deleteProject');
deleteButton.addEventListener('click', () => deleteProject(projectId));
return deleteButton;
}

function deleteProject(projectId) {
const options = {
    method: 'DELETE'
};
fetch(`/api/projects/${projectId}`, options)
    .then(response => response.json())
    .then(data => {
        window.location.href = 'projects.html';
    });
}

function updateProject(project) {
fetch(`/api/projects/${project.id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(project)
})
    .then(response => response.json())
    .then(data => {
        displayProjectDetails(project);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}



window.onload = function() {
const params = new URLSearchParams(window.location.search);
const projectId = parseInt(params.get('id'));
getData(projectId); // Call getData with the project ID

const deleteButton = document.querySelector('.deleteProject');
if (deleteButton) {
    deleteButton.addEventListener('click', () => {
        deleteProject(projectId);
    });
}
};