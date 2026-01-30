// Sample data (in a real app, this would come from a database)
const projects = [
    { id: 201, name: "CI/CD Pipeline", startDate: "2024‑11‑20", status: "Completed" },
    { id: 202, name: "Kubernetes Migration", startDate: "2025‑04‑10", status: "In Progress" },
    { id: 203, name: "Q2 Outreach", startDate: "2025‑04‑01", status: "Not Started" },
    { id: 204, name: "Onboarding Revamp", startDate: "2025‑01‑05", status: "Completed" },
    { id: 205, name: "NPS Survey", startDate: "2025‑05‑22", status: "In Progress" },
    { id: 206, name: "Brand Refresh", startDate: "2025‑02‑01", status: "In Progress" }
];

const departments = ["Engineering", "Design", "Marketing", "Human Resources", "Finance", "Sales", "Customer Success"];
const roles = ["Frontend Developer", "Backend Developer", "UX Designer", "SEO Specialist", "HR Manager", "Accountant", "DevOps Engineer", "Account Executive", "CS Manager", "Graphic Designer"];


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

let id = 111;

function pagination(page = 1) {
    const p = parseInt(page);
    const start = (p - 1) * 7;
    const end = start + 6;
    return employees.slice(start, end);
}

export const fetchProjects = (req, res) => {
    try {
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: "Error fetching projects" });
    }
};

export const fetchDepartments = (req, res) => {
    try {
        res.json(departments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching projects" });
    }
};

export const fetchRoles = (req, res) => {
    try {
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: "Error fetching projects" });
    }
};

export const fetchEmployees = (req, res) => {
    try {
        const name = req.query.name.toLowerCase();
        const dept = req.query.dept;
        const role = req.query.role;
        const salary = req.query.salary.split("-");
        const result = employees.filter((employee) => {
            let found = false;
            if (employee.department === dept)
                found = true;

            if (employee.role === role)
                found = true;

            if ((salary[0] && employee.salary > salary[0]) && (!salary[1] || employee.salary < salary[1]))
                found = true;

            if (employee.name.toLowerCase().match(name) !== null)
                found = true;

            return found;
        });

        if (name === "" && dept === "" && role === "" && salary.length === 1)
            res.json(pagination());
        else
            res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching employees" });
    }
};

export const createEmployee = (req, res) => {
    console.log(req.body);
    const employee = {
        id: id++,
        name: req.body.name,
        department: req.body.dept,
        role: req.body.role,
        email: req.body.email,
        phone: req.body.phone,
        projects: req.body.projects,
        salary: req.body.salary
    };
    employees.push(employee);
    console.log(employees.length);
    res.json({ message: "Success" });
};

export const pageChange = (req, res) => {
    const page = req.params.page;
    res.json(pagination(page));
};

export const employeeCount = (req, res) => {
    console.log(employees.length);
    res.json(employees.length);
};

export const updateEmployee = (req, res) => {
    console.log(req.body);
    const { id, name, dept, role, email, phone, projects, salary } = req.body;
    const employee = employees.find((employee) => employee.id === id);
    employee.name = name;
    employee.department = dept;
    employee.role = role;
    employee.email = email;
    employee.phone = phone;
    employee.projects = projects;
    employee.salary = salary;
    console.log(employees.length);
    res.json({ message: "Employee information edited successfully" });
};

export const deleteEmployee = (req, res) => {
    let id = req.body.id;
    console.log(id);
    const searchIndex = employees.findIndex((emp) => emp.id === id);
    employees.splice(searchIndex, 1);
    console.log(employees.length);
    res.json({ message: "Employee deleted successfully" });
};