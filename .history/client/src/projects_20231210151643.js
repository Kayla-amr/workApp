let projects = []

async function getData() {
    const response = await fetch('api/projects');
    const data = await response.json();
    projects = data;
    viewProjects(projects);
}
getData();

let projectList = document.querySelector('.projects');
let newProjectForm = document.querySelector('.newProject');
let saveBtn = document.querySelector('.saveBtn');
let formData = new FormData(newProjectForm, saveBtn);


function addProject(event) {
    event.preventDefault();

    let formData = new FormData(newProjectForm);
    console.log(formData);

    fetch('api/projects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: formData.get('name'),
            description: formData.get('description'),
            dueDate: formData.get('dueDate'),
            equipment: formData.get('equipment'),
            employees: formData.get('employees'),
            cost: formData.get('cost'),
        })
    })
    .then(response => response.json())
    .then(data => {
        projects = data;
        viewProjects(projects);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
newProjectForm.addEventListener('submit', addProject);




function projectBox (project) {
    let div = document.createElement('div');
    div.setAttribute('id', project.id);
    div.setAttribute('class', 'projectBox');
    div.innerText = project.name;

    div.addEventListener('click', function() {
        window.location.href = 'projectDescr.html?id=' + project.id;
    });

    return div;
}
function searchProjects() {
    let searchInput = document.querySelector('.searchProject');
    let filteredProjects = projects.filter(project => {
        return project.name.toLowerCase().includes(searchInput.value.toLowerCase());
    });
    viewProjects(filteredProjects);
}

searchInput = document.querySelector('.searchPBtn');
searchInput.addEventListener('click', (event) => {
    searchProjects();
}
);

function viewProjects(projects) {
    projectList.innerHTML = '';
    projects.forEach(project => {
        projectList.appendChild(projectBox(project));
    });
}
viewProjects(projects);