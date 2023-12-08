let projects = []

async function getData() {
    const response = await fetch('api/projects');
    const data = await response.json();
    projects = data;
    viewProjects(projects);
}
getData();

let projectList = document.querySelector('.projects');

function addProject() {
    let userPName = document.querySelector('.userPName');
    let userPDesc = document.querySelector('.userPDesc');
    let userPDate = document.querySelector('.userPDate');
    fetch('api/projects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name:userPName.value,
            description:userPDesc.value,
            dueDate:userPDate.value
        })
    })
    .then(response => response.json())
    .then(data => {
        projects = data;
        viewProjects(projects);
    })
    .catch((error) => {
        console.error('Error:', error);
    }
    );

}

addPInput = document.querySelector('.addPInput');
addPInput.addEventListener('click', (event) => {
    addProject();
}
);

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

function viewProjects(projects) {
    projectList.innerHTML = '';
    projects.forEach(project => {
        projectList.appendChild(projectBox(project));
    });
}
viewProjects(projects);
