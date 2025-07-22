const projects = [
    { id: 201, name: "CI/CD Pipeline", startDate: "2024‑11‑20", status: "Completed" },
    { id: 202, name: "Kubernetes Migration", startDate: "2025‑04‑10", status: "In Progress" },
    { id: 203, name: "Q2 Outreach", startDate: "2025‑04‑01", status: "Not Started" },
    { id: 204, name: "Onboarding Revamp", startDate: "2025‑01‑05", status: "Completed" },
    { id: 205, name: "NPS Survey", startDate: "2025‑05‑22", status: "In Progress" },
    { id: 206, name: "Brand Refresh", startDate: "2025‑02‑01", status: "In Progress" }
];

const employees = [
    {
        id: 101,
        name: "Aisha Banerjee",
        department: "Engineering",
        role: "Frontend Developer",
        email: "aisha.banerjee@example.com",
        phone: "+919876543210",
        projects: [201, 202],
        salary: 95000
    },
    {
        id: 102,
        name: "Rahul Mehta",
        department: "Engineering",
        role: "Backend Developer",
        email: "rahul.mehta@example.com",
        phone: "+919123456789",
        projects: [],
        salary: 105000
    },
    {
        id: 103,
        name: "Keerthi Rao",
        department: "Design",
        role: "UX Designer",
        email: "keerthi.rao@example.com",
        phone: "+919988777665",
        projects: [206],
        salary: 125000
    },
    {
        id: 104,
        name: "Sanjay Kulkarni",
        department: "Marketing",
        role: "SEO Specialist",
        email: "sanjay.k@example.com",
        phone: "+919870011223",
        projects: [203],
        salary: 88000
    },
    {
        id: 105,
        name: "Neha Sharma",
        department: "Human Resources",
        role: "HR Manager",
        email: "neha.sharma@example.com",
        phone: "+919001234567",
        projects: [204, 205],
        salary: 115000
    },
    {
        id: 106,
        name: "Arjun Singh",
        department: "Finance",
        role: "Accountant",
        email: "arjun.singh@example.com",
        phone: "+919012345678",
        projects: [],
        salary: 78000
    },
    {
        id: 107,
        name: "Priya Desai",
        department: "Engineering",
        role: "DevOps Engineer",
        email: "priya.desai@example.com",
        phone: "+919321098765",
        projects: [201, 202],
        salary: 99000
    },
    {
        id: 108,
        name: "Vikram Kapoor",
        department: "Sales",
        role: "Account Executive",
        email: "vikram.kapoor@example.com",
        phone: "+919765432109",
        projects: [203],
        salary: 67000
    },
    {
        id: 109,
        name: "Meera Iyer",
        department: "Customer Success",
        role: "CS Manager",
        email: "meera.iyer@example.com",
        phone: "+919234567801",
        projects: [204, 205],
        salary: 112000
    },
    {
        id: 110,
        name: "Kabir Khan",
        department: "Design",
        role: "Graphic Designer",
        email: "kabir.khan@example.com",
        phone: "+919887654321",
        projects: [206],
        salary: 54000
    }
];

const departments = ["Engineering", "Design", "Marketing", "Human Resources", "Finance", "Sales", "Customer Success"];
const roles = ["Frontend Developer", "Backend Developer", "UX Designer", "SEO Specialist", "HR Manager", "Accountant", "DevOps Engineer", "Account Executive", "CS Manager", "Graphic Designer"];

 // TODO: Implement the logic to show the employees in the table

const tableBody = document.getElementById("employee-table");


 

 // TODO: Implement the logic to show the filters in the UI

const departmentFilter = document.getElementById("department-filter");
const roleFilter = document.getElementById("role-filter");
const nameFilter = document.getElementById("name-filter");
const salaryFilter = document.getElementById("salary-filter");
const search = document.getElementById("search");
const reset = document.getElementById("reset");
const backdrop = document.getElementById("backdrop");
const basic = document.getElementById("basic");
const info_list = document.getElementById("info_list");
const info_btn = document.getElementById("info_btn");
const pro_btn = document.getElementById("pro_btn");

renderEntries(employees);

departments.forEach((department) =>  createOptions(department, departmentFilter));

roles.forEach((role) => createOptions(role, roleFilter));

function createOptions(data, selectElement) {
    const option = document.createElement("option");
    option.innerHTML = data;
    option.value = data;
    selectElement.appendChild(option);
}

function renderEntries(collection){
    tableBody.innerHTML = "";
    collection.forEach((employee) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td> ${employee.name} </td>
            <td> ${employee.department} </td>
            <td> ${employee.role} </td>
            <td> ${employee.salary} </td>`;
        tableBody.appendChild(row);
        row.style.cursor = "pointer";
        row.addEventListener("click", () => backdropDisplay(employee));
    });
}

function backdropDisplay(employee){
    console.log('Called');
    backdrop.classList.toggle("hidden");
    pro_btn.classList.remove("active");
    info_btn.classList.add("active");
    basic.innerHTML = `<div class="circle">${employee.name[0]}</div>`;
    basic.innerHTML += `<h5 style = 'line-height: 2.5rem;'> ${employee.name} </h5>` +
    `<span>${employee.email} <br></span>`;
    info_list.innerHTML = "";
    info_list.innerHTML = `Employee ID: ${employee.id} <br> Phone Number: ${employee.phone}`;
    
    pro_btn.addEventListener("click", () => {
        pro_btn.classList.add("active");
        info_btn.classList.remove("active");
        if (employee.projects.length){
            info_list.innerHTML = "";
            employee.projects.forEach((id) => {
                projects.forEach((obj) => {
                    if( id === obj.id){
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

 // TODO: Implement the logic to filter the employees based on the filters

search.addEventListener("click", () => {
    let name = nameFilter.value;
    let dept = departmentFilter.value;
    let role = roleFilter.value;
    let salary = salaryFilter.value.split("-");
    
    const result = employees.filter((employee) => {
        let found = false;
        if (employee.department === dept)
            found = true;
        
        if (employee.role === role)
            found = true;

        if ( (salary[0] && employee.salary > salary[0]) && (!salary[1] || employee.salary < salary[1]))
            found = true;

        if(name && employee.name.toLowerCase().match(name.toLowerCase()) !== null)
            found = true;

        return found;
    });

    renderEntries(result);
});

reset.addEventListener("click", () => {
    renderEntries(employees);
    departmentFilter.value = "";
    roleFilter.value = "";
    nameFilter.value = "";
    salaryFilter.value = "";
});

 // TODO: Implement the employee details view drawer

 