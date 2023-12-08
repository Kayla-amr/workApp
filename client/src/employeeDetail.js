async function getData(employeeId){
    const response = await fetch(`/api/employees/${employeeId}`);
    const employee = await response.json();

    displayEmployeeDetails(employee);
}

window.onload = function() {
const params = new URLSearchParams(window.location.search);
const employeeId = parseInt(params.get('id'));
if (!isNaN(employeeId)) {
    getData(employeeId);
} else {
    console.error("Invalid employee ID");
}
};

function getEmployeeById(id) {
return employees.find(employee => employee.id === id);
}

function displayEmployeeDetails(employee) {
const employeeDetailsDiv = document.querySelector('.employeeDetails');

if (employee) {
    let pay = parseFloat(employee.pay);
    employeeDetailsDiv.innerHTML = `
        <h2 class="employeeName">${employee.name}</h2>
        <h3 class="employeeTitle">${employee.title}</h3>
        <h3 class="employeePay">$${pay.toFixed(2)}</h3>
        <button class="editEmployee">Edit</button>
    `
    employeeDetailsDiv.appendChild(createDeleteButton(employee.id))
    ;

    document.querySelector('.editEmployee').addEventListener('click', () => enableEditMode(employee));
} else {
    employeeDetailsDiv.innerText = 'Employee not found';
}
}

function enableEditMode(employee) {
const employeeDetailsDiv = document.querySelector('.employeeDetails');
employeeDetailsDiv.innerHTML = `
    <input class="editEmployeeName" type="text" value="${employee.name}">
    <input class="editEmployeeTitle" type="text" value="${employee.title}">
    <input class="editEmployeePay" type="text" value="${employee.pay}">
    <button class="saveEmployeeChanges">Save Changes</button>`;

document.querySelector('.saveEmployeeChanges').addEventListener('click', () => saveChanges(employee));
}

function saveChanges(employee) {
employee.name = document.querySelector('.editEmployeeName').value;
employee.title = document.querySelector('.editEmployeeTitle').value;
employee.pay = parseFloat(document.querySelector('.editEmployeePay').value);

updateEmployee(employee);
}

function createDeleteButton(employeeId) {
const deleteButton = document.createElement('button');
deleteButton.classList.add('deleteEmployee');
deleteButton.innerText = 'Delete';
deleteButton.addEventListener('click', () => deleteEmployee(employeeId));
return deleteButton;
}

function deleteEmployee(employeeId) {
if (confirm('Are you sure you want to delete this employee?')) {
    fetch(`/api/employees/${employeeId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        window.location.href = 'employees.html'; 
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
}

function updateEmployee(employee) {
fetch(`/api/employees/${employee.id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(employee)
})
.then(response => response.json())
.then(data => {
    console.log('Success:', data);
    displayEmployeeDetails(employee); 
})
.catch((error) => {
    console.error('Error:', error);
});
}



window.onload = function() {
const params = new URLSearchParams(window.location.search);
const employeeId = parseInt(params.get('id'));
getData(employeeId); // Call getData with the employee ID

const deleteButton = document.querySelector('.deleteEmployee');
if (deleteButton) {
    deleteButton.addEventListener('click', () => {
        deleteEmployee(employeeId);
    });
}
};