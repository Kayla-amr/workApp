let equipments = [];

function getData() {
    let equipmentPromise = fetch('api/equipment');
    equipmentPromise.then(response => {
        return response.json();
    }).then(data => {
        equipments = data;
        viewEquipment(equipments);
    });
}

getData();

function viewEquipment(equipments) {
    let equipmentList = document.querySelector('.equipment');
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