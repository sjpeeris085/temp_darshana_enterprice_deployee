import { START_LOADING, END_LOADING, EMPLOYEE } from 'constants/actionTypes';

const employees = (state = { isLoading: true, employees: [], error: '' }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true, error: '' };
        case END_LOADING:
            return { ...state, isLoading: false, error: '' };
        case EMPLOYEE.FETCH_ALL:
            return {
                ...state,
                employees: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            };
        case EMPLOYEE.FETCH_BY_SEARCH:
            return {
                ...state,
                employees: action.payload
            };
        case EMPLOYEE.CREATE:
            // add new employee obj to existing array
            //new employee obj = action.payload
            return {
                ...state,
                employees: [...state.employees, action.payload],
                error: ''
            };
        case EMPLOYEE.UPDATE:
            // update particular employee from redux-store
            return {
                ...state,
                employees: state.employees.map((employee) => (employee._id === action.payload._id ? action.payload : employee))
            };
        default:
            return state;
    }
};

export default employees;
