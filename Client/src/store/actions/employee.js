import { dispatch } from 'store/index';
import { START_LOADING, END_LOADING, EMPLOYEE } from '../../constants/actionTypes';

import * as api from '../api';

export const getEmployees = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.fetchEmployees(page);
        console.log('====== API CALL:fetchEmployees ======');

        dispatch({ type: EMPLOYEE.FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const getEmployeesWithAttendance = (page, monthStart, monthEnd) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.fetchEmployeesWithAttendance(page, monthStart, monthEnd);
        console.log('====== API CALL:fetchEmployees ======');

        dispatch({ type: EMPLOYEE.FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const getEmployeesBySearch = (value) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const {
            data: { data }
        } = await api.fetchEmployeesBySearch(value);
        //sending responsse data as a payload to Reducers
        dispatch({ type: EMPLOYEE.FETCH_BY_SEARCH, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const addEmployee = (newEmployee) => async (dispatch) => {
    try {
        const { data } = await api.addEmployee(newEmployee);
        dispatch({ type: EMPLOYEE.CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};
