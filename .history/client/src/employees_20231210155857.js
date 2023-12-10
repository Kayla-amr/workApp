
let employees = [];

async function getData(){
   let employeePromise = await fetch('api/employees');
   Promise.all([employeePromise])
    .then(responses => {
         return Promise.all(responses.map(response => {
              return response.json();
         }));
    }).then(data => {
         employees = data[0];
         viewEmployees(employees);
    });
}
getData();


let employeeList = document.querySelector('.employee');

function addEmployee() {
    let userEName = document.querySelector('.userEName');
    let userETitle = document.querySelector('.userETitle');
    let userEPay = document.querySelector('.userEPay');
    fetch('api/employees', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name:userEName.value,
            title:userETitle.value,
            pay:parseFloat(userEPay.value)
        })
    })
    .then(response => response.json())
    .then(data => {
        employees = data;
        viewEmployees(employees);
    })
    .catch((error) => {
        console.error('Error:', error);
    }
    );

}

addEInput = document.querySelector('.addEInput');
addEInput.addEventListener('click', (event) => {
    addEmployee();
}
);

function employeeProfile(employee) {
    let li = document.createElement('li');
    li.setAttribute('id', employee.id);
    li.innerText = employee.name;

    // Add click event listener
    li.addEventListener('click', function() {
        // Redirect to employee detail page
        window.location.href = 'employee.html?id=' + employee.id;
    });

    return li;
}

function searchEmployees() {
    let searchInput = document.querySelector('.searchEmployee');
    let filteredEmployees = employees.filter(employee => employee.name.toLowerCase().includes(searchInput.value.toLowerCase()));
    viewEmployees(filteredEmployees);
}

searchInput = document.querySelector('.searchEBtn');
searchInput.addEventListener('click', (event) => {
    searchEmployees();
}
);

function viewEmployees(employees) {
    employeeList.innerHTML = '';
    employees.forEach((employee) => {
        let li = employeeProfile(employee);
        employeeList.appendChild(li);
    });
}

viewEmployees(employees);

