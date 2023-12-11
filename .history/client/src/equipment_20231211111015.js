let equipments = [];
let projects = [];

let equipmentList = document.querySelector('.equipment');
let projectOptions = document.querySelector('.projectOptions');

function getData() {
    let equipmentPromise = fetch('api/equipment');
    let projectPromise = fetch('api/projects');

    Promise.all([equipmentPromise, projectPromise])
        .then(responses => {
            return Promise.all(responses.map(response => {
                return response.json();
            }));
        }
        )
        .then(data => {
            equipments = data[0];
            projects = data[1]; 
            viewEquipment(equipments);
            projectOptionList(projects);
        })
        .catch(err => {
            console.log(err);
        });
}

getData();

function addEquipment(){
    let userEName = document.querySelector('.userEName');
    let userEQuantity = document.querySelector('.userEQuantity');
    let userECost = document.querySelector('.userECost');
    fetch('api/equipment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name:userEName.value,
            quantity:userEQuantity.value,
            cost:parseFloat(userECost.value)
        })
    })
    .then(response => response.json())
    .then(data => {
        equipments = data;
        viewEquipment(equipments);
    })
    .catch((error) => {
        console.error('Error:', error);
    }
    );

}

addEInput = document.querySelector('.addEInput');
addEInput.addEventListener('click', (event) => {
    addEquipment();
}
);

function calculateCost() {
    let userECost = document.querySelector('.userECost');
    let userEQuantity = document.querySelector('.userEQuantity');
    let totalCost = userECost.value * userEQuantity.value;
    return totalCost;
}


function projectOptionList(projects) {
    const dropdowns = document.querySelectorAll('.selectedProject');
    dropdowns.forEach(dropdown => {
        projects.forEach(project => {
            let option = createProjectOption(project, dropdown.value);
            dropdown.appendChild(option);
        });
    });
    }

    function addEquipmentsToProject() {
        const checkboxes = document.querySelectorAll('.equipment input[type="checkbox"]');
    
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const selectedProjectDropdown = document.querySelector('.selectedProject');
                const selectedProjectName = selectedProjectDropdown.value;
                const project = projects.find(p => p.name === selectedProjectName);
    
                if (!project) {
                    console.log("No project selected or project not found");
                    return;
                }
    
                if (e.target.checked) {
                    if (!project.equipment.includes(e.target.value)) {
                        project.equipment.push(e.target.value);
                    }
                } else {
                    project.equipment = project.equipment.filter(equipment => equipment !== e.target.value);
                }
    
                updateProject(project);
            });
        });
    }
    
function addEProjectBtn() {
    const addBtn = document.querySelector('.addEProject');
    addBtn.addEventListener('click', (e) => {
        const selectedProjectDropdown = document.querySelector('.selectedProject');
        const selectedProjectName = selectedProjectDropdown.value;
        const project = projects.find(p => p.name === selectedProjectName);

        if (!project) {
            console.log("No project selected or project not found");
            return;
        }

        const newEquipment = document.querySelector('.newEquipment');
        const newEquipmentName = newEquipment.value;

        if (!project.equipment.includes(newEquipmentName)) {
            project.equipment.push(newEquipmentName);
            console.log(project.equipment);
        }

        updateProject(project);
    });
}


function updateProject(project) {
    fetch(`api/projects/${project.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);

        });
}

function createProjectOption(equipment, selectedProject) {
    let option = document.createElement('option');
    option.value = equipment.name;
    option.innerText = equipment.name;
    if (equipment.name === selectedProject) {
        option.selected = true;
    }
    return option;
}

function viewEquipment(equipments) {
    equipmentList.innerHTML = '';

    equipments.forEach(equipment => {
        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('id', equipment.id);
        checkbox.setAttribute('name', equipment.name);
        checkbox.setAttribute('value', equipment.name);
        equipmentList.appendChild(checkbox);

        let label = document.createElement('label');
        label.setAttribute('for', equipment.name);
        label.innerText = equipment.name;
        equipmentList.appendChild(label);    
    });
}

