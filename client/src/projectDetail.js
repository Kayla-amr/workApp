async function getData(projectId){
    const response = await fetch(`/api/projects/${projectId}`);
    const project = await response.json();

    displayProjectDetails(project);
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
        <h3 class="projectDate">${project.dueDate}</h3>
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

function enableEditMode(project) {
const projectDetailsDiv = document.querySelector('.projectDetails');
projectDetailsDiv.innerHTML = `
    <input class="editProjectName" type="text" value="${project.name}">
    <input class="editProjectDesc" type="text" value="${project.description}">
    <input class="editProjectDate" type="text" value="${project.dueDate}">
    <input class="editProjectEquipment" type="text" value="${project.equipment}">
    <input class="editProjectEmployees" type="text" value="${project.employees}">
    <input class="editProjectCost" type="text" value="${project.cost}">

    <button class="saveProjectChanges">Save Changes</button>`;
document.querySelector('.saveProjectChanges').addEventListener('click', () => saveChanges(project));
}

function saveChanges(project) {
project.name = document.querySelector('.editProjectName').value;
project.description = document.querySelector('.editProjectDesc').value;
project.dueDate = document.querySelector('.editProjectDate').value;
project.equipment = document.querySelector('.editProjectEquipment').value;
project.employees = document.querySelector('.editProjectEmployees').value;
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
