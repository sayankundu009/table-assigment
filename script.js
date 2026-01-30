// const projects = [
//     { id: 201, name: "CI/CD Pipeline", startDate: "2024‑11‑20", status: "Completed" },
//     { id: 202, name: "Kubernetes Migration", startDate: "2025‑04‑10", status: "In Progress" },
//     { id: 203, name: "Q2 Outreach", startDate: "2025‑04‑01", status: "Not Started" },
//     { id: 204, name: "Onboarding Revamp", startDate: "2025‑01‑05", status: "Completed" },
//     { id: 205, name: "NPS Survey", startDate: "2025‑05‑22", status: "In Progress" },
//     { id: 206, name: "Brand Refresh", startDate: "2025‑02‑01", status: "In Progress" }
// ];

// const departments = ["Engineering", "Design", "Marketing", "Human Resources", "Finance", "Sales", "Customer Success"];
// const roles = ["Frontend Developer", "Backend Developer", "UX Designer", "SEO Specialist", "HR Manager", "Accountant", "DevOps Engineer", "Account Executive", "CS Manager", "Graphic Designer"];

let employees = [];

const tableBody = document.getElementById("employee-table");
const departmentFilter = document.getElementById("department-filter");
const roleFilter = document.getElementById("role-filter");
const nameFilter = document.getElementById("name-filter");
const salaryFilter = document.getElementById("salary-filter");
const search = document.getElementById("search");
const reset = document.getElementById("reset");
const backdrop = document.getElementById("backdrop");
const editdrop = document.getElementById("editdrop");
const basic = document.getElementById("basic");
const info_list = document.getElementById("info_list");
const info_btn = document.getElementById("info_btn");
const pro_btn = document.getElementById("pro_btn");
const addForm = document.getElementById("addp-form");
const editForm = document.getElementById("edit-form");
const pagination = document.getElementById("pagination");
const employeeInfo = document.getElementById("employeeInfo");
const add = document.getElementById("add");
const deleteBtn = document.getElementById("delete");

fetchEmployee();

(async () => {
    const departments = await (await fetch("http://localhost:3000/employees/departments")).json();
    const roles = await (await fetch("http://localhost:3000/employees/roles")).json();
    roles.forEach((role) => createOptions(role, roleFilter));
    departments.forEach((department) => createOptions(department, departmentFilter));
})();

function createOptions(data, selectElement) {
    const option = document.createElement("option");
    option.innerHTML = data;
    option.value = data;
    selectElement.appendChild(option);
}

function renderEntries(collection) {
    tableBody.innerHTML = "";
    collection.forEach((employee) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td> ${employee.name} </td>
            <td> ${employee.department} </td>
            <td> ${employee.role} </td>
            <td> ${employee.salary} </td>
            <td id = "employee${employee.id}"> 📝 </td>`;
        tableBody.appendChild(row);
        row.style.cursor = "pointer";
        let employeeEdit = document.getElementById(`employee${employee.id}`);
        row.addEventListener("click", () => backdropDisplay(employee));
        employeeEdit.addEventListener("click", (event) => {
            event.stopPropagation();
            showEditModal(employee);
        });
    });
}

function showEditModal(employee) {
    editdrop.classList.toggle("hidden");
    editForm.name.value = employee.name;
    editForm.department.value = employee.department;
    editForm.role.value = employee.role;
    editForm.salary.value = employee.salary;
    editForm.phone.valueAsNumber = employee.phone;
    editForm.email.value = employee.email;
    editForm.projects.value = employee.projects;
    editForm.id.value = employee.id;
}

async function backdropDisplay(employee) {
    backdrop.classList.toggle("hidden");
    pro_btn.classList.remove("active");
    info_btn.classList.add("active");
    basic.innerHTML = `<div class="circle">${employee.name[0]}</div>`;
    basic.innerHTML += `<h5 style = 'line-height: 2.5rem;'> ${employee.name} </h5>` +
        `<span>${employee.email} <br></span>`;
    info_list.innerHTML = "";
    info_list.innerHTML = `Employee ID: ${employee.id} <br> Phone Number: ${employee.phone}`;

    pro_btn.addEventListener("click", async () => {
        pro_btn.classList.add("active");
        info_btn.classList.remove("active");
        if (employee.projects.length) {
            info_list.innerHTML = "";
            const projects = await (await fetch("http://localhost:3000/employees/projects")).json();
            employee.projects.forEach((id) => {
                projects.forEach((obj) => {
                    if (id === obj.id) {
                        info_list.innerHTML += `<p>Project Code: ${obj.id} <br>
                        Project Name: ${obj.name} <br>
                        Start Date: ${obj.startDate} <br> 
                        Status: ${obj.status} </p>`;
                    }
                });
            });
        }
        else
            info_list.innerHTML = "Projects : None";
    });

    info_btn.addEventListener("click", () => {
        pro_btn.classList.remove("active");
        info_btn.classList.add("active");
        info_list.innerHTML = `Employee ID: ${employee.id} <br> Phone Number: ${employee.phone}`;
    });

}

async function fetchEmployee(name = "", dept = "", role = "", salary = "") {
    employees = await (await fetch(`http://localhost:3000/employees?name=${name}&dept=${dept}&role=${role}&salary=${salary}`)).json();
    renderEntries(employees);
}

async function setupPagination() {
    try {
        const response = await fetch("http://localhost:3000/employees/count");
        const employeeCount = await response.json();
        const pages = Math.ceil(employeeCount / 7);
        for (let i = 1; i <= pages; i++) {
            const btn = document.createElement("button");
            btn.innerText = i;
            btn.addEventListener("click", async () => {
                const employees = await (await fetch(`http://localhost:3000/employees/${i}`)).json();
                renderEntries(employees);
            });
            pagination.appendChild(btn);
        }
    } catch (error) {
        console.error("Error in setupPagination:", error);
    }
}
setupPagination();

// TODO: Implement the logic to filter the employees based on the filters

search.addEventListener("click", () => {
    let name = nameFilter.value;
    let dept = departmentFilter.value;
    let role = roleFilter.value;
    let salary = salaryFilter.value;

    fetchEmployee(name, dept, role, salary);
});

reset.addEventListener("click", () => {
    fetchEmployee();
    departmentFilter.value = "";
    roleFilter.value = "";
    nameFilter.value = "";
    salaryFilter.value = "";
});

add.addEventListener("click", () => {
    addForm.classList.toggle("hidden");
    employeeInfo.classList.toggle("hidden");
});
// TODO: Implement the employee details view drawer

addForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    addForm.classList.toggle("hidden");
    employeeInfo.classList.toggle("hidden");
    const name = addForm.name.value;
    const dept = addForm.department.value;
    const role = addForm.role.value;
    const email = addForm.email.value;
    const phone = addForm.phone.value;
    const projects = addForm.projects.value.split(",").map((value) => parseInt(value));
    const salary = parseInt(addForm.salary.value);
    const values = { name, dept, role, email, phone, projects, salary };
    await fetch("http://localhost:3000/employees/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
    });
    addForm.reset();
    fetchEmployee();
});

editForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    editdrop.classList.toggle("hidden");
    const id = parseInt(editForm.id.value);
    const name = editForm.name.value;
    const dept = editForm.department.value;
    const role = editForm.role.value;
    const email = editForm.email.value;
    const phone = editForm.phone.value;
    const projects = editForm.projects.value.split(",").map((id) => parseInt(id));
    const salary = parseInt(editForm.salary.value);
    const values = { id, name, dept, role, email, phone, projects, salary };
    await fetch("http://localhost:3000/employees/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
    });
    fetchEmployee();
});

deleteBtn.addEventListener("click", async () => {
    const id = parseInt(editForm.id.value);
    editdrop.classList.toggle("hidden");
    await fetch("http://localhost:3000/employees/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    });
    fetchEmployee();
    setupPagination();
})