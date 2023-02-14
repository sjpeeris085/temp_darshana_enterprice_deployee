import axios from 'axios';

//LOCAL
//const API = axios.create({ baseURL: 'http://localhost:5000' });

//LIVE
const API = axios.create({ baseURL: 'http://35.209.133.25/de-payroll' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

//EMPLOYEE :::::::::::::::::::::::::::::::::::::::::
export const fetchEmployee = (id) => API.get(`/employee/${id}`);

export const fetchAllEmployees = () => API.get(`/employee/all`);

export const fetchEmployees = (page) => API.get(`/employee?page=${page}`);

export const fetchEmployeesWithAttendance = (page, monthStart, monthEnd) =>
    API.get(`/employee/get-with-attendance?page=${page}&monthStart=${monthStart}&monthEnd=${monthEnd}`);

export const fetchEmployeesBySearch = (search_text) => API.post('/employee/search', { search_text });

export const addEmployee = (newEmployee) => API.post('/employee/create-account', newEmployee);

export const updateEmployee = (id, employee) => API.patch(`/employee/${id}`, employee);

//ATTENDANCE :::::::::::::::::::::::::::::::::::::::::
export const saveAttendance = (data) => API.post('/attendance/add-list', data);

//SALARY :::::::::::::::::::::::::::::::::::::::::
export const saveSalary = (data) => API.post('/salary/save', data);
