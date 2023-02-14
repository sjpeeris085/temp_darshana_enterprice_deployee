import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Box, FormControl, InputAdornment, OutlinedInput } from '@mui/material';

import { SearchOutlined } from '@ant-design/icons';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

// project import
import CustomizedSnackbars from 'components/Snackbar/CustomizedSnackbars';
import EmpTable from './EmpTable';
import MainCard from 'components/MainCard';
import { getEmployees, getEmployeesBySearch } from 'store/actions/employee';
import AlertDialog from 'components/Alert/AlertDialog';
import EmpForm from './EmpForm';
import * as api from '../../store/api';
import { EMPLOYEE } from 'constants/actionTypes';
import { ALERT } from 'constants/commonConstants.js';

const Employees = () => {
    const { numberOfPages } = useSelector((state) => state.employees);

    const dispatch = useDispatch(); // to dispatch the actions

    const [currentId, setCurrentId] = useState(0);
    const employee = useSelector((state) => (currentId ? state.employees.employees.find((s) => s._id === currentId) : null));

    const [isShowSnackbar, setIsShowSnackbar] = useState(false);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const prevSearchTextRef = useRef();
    const [open, setOpen] = React.useState(false); //Form
    const [isAlertOpen, setIsAlertOpen] = useState(false); //Alert

    const [error, setError] = useState('');
    const [isFormSubmitting, setIsFormSubmitting] = useState(false);

    const alertRef = useRef();

    useEffect(() => {
        if (page) dispatch(getEmployees(page));
    }, [page]);

    useEffect(() => {
        prevSearchTextRef.current = searchText; //access previouse search text : prevSearchTextRef.current
        searchEmployees();
    }, [searchText]);

    //https://mui.com/material-ui/react-pagination/  [Controlled pagination]
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const searchEmployees = () => {
        if (searchText.trim()) {
            //fetch by search
            dispatch(getEmployeesBySearch(searchText));
        } else {
            //fetch all
            dispatch(getEmployees(page));
        }
    };

    const handleDeleteOnclick = () => {
        setIsAlertOpen(true);
        console.log(isAlertOpen);
    };

    const handleEditOnclick = (supplier_code) => {
        setCurrentId(supplier_code);
        handleClickOpenForm();
    };

    const alertResult = (result) => {
        setIsAlertOpen(false);
        if (result) deleteEmployee();
    };

    const deleteEmployee = () => {};

    const handleClickOpenForm = () => {
        setOpen(true);
    };

    const handleCloseForm = (event, reason) => {
        // avoid close Modal by press Esc: disableEscapeKeyDown
        // avoid close Modal by outside click
        if (reason !== 'backdropClick') {
            setOpen(false);
            setCurrentId(null);
            setError('');
        }
    };

    const handleSubmitForm = async (values) => {
        if (!currentId || currentId === 0) {
            setIsFormSubmitting(true);
            try {
                const { data } = await api.addEmployee(values);
                dispatch({ type: EMPLOYEE.CREATE, payload: data });
                setError('');
                setIsFormSubmitting(false);
                handleCloseForm();
                alertRef.current.showAlert({ type: ALERT.SUCCESS, message: 'Successfully saved' });
                return {
                    success: true // then only the form can reset
                };
            } catch (error) {
                console.info('--------- error ---------');
                let errorMsg = error?.response?.data?.error.replace(/"/g, '');
                alertRef.current.showAlert({ type: ALERT.ERROR, message: errorMsg });
                setError(errorMsg);
                setIsFormSubmitting(false);
                return {
                    success: false
                };
            }
        } else {
            //update employee
            setIsFormSubmitting(true);
            try {
                const { data } = await api.updateEmployee(currentId, values);
                dispatch({ type: EMPLOYEE.UPDATE, payload: data });
                setError('');
                setIsFormSubmitting(false);
                handleCloseForm();
                alertRef.current.showAlert({ type: ALERT.SUCCESS, message: 'Successfully updated' });
                return {
                    success: true // then only the form can reset
                };
            } catch (error) {
                alertRef.current.showAlert({ type: ALERT.ERROR, message: error?.response?.data?.message });
                setError(error?.response?.data?.message);
                setIsFormSubmitting(false);
                return {
                    success: false
                };
            }
        }
    };

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} md={12} lg={12}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Box sx={{ width: '100%', ml: { xs: 0, md: 0 } }}>
                            <FormControl sx={{ width: { xs: '100%', md: 1000 } }}>
                                <OutlinedInput
                                    id="table-search"
                                    size="small"
                                    onChange={(e) => setSearchText(e.target.value)}
                                    startAdornment={
                                        <InputAdornment position="start" sx={{ mr: -0.5 }}>
                                            <SearchOutlined />
                                        </InputAdornment>
                                    }
                                    aria-describedby="header-search-text"
                                    inputProps={{
                                        'aria-label': 'weight'
                                    }}
                                    placeholder="Search employees"
                                />
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Button size="small" onClick={handleClickOpenForm} color="primary" variant="outlined">
                            Add New Employee
                        </Button>
                    </Grid>
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <EmpTable deleteOnClick={handleDeleteOnclick} editOnClick={handleEditOnclick} />
                    {!searchText && (
                        <Stack spacing={2} style={{ padding: '15px' }}>
                            <Typography>
                                Page: {page} of {numberOfPages}
                            </Typography>
                            <Pagination count={numberOfPages} page={page} onChange={handlePageChange} />
                        </Stack>
                    )}
                    {isAlertOpen && (
                        <AlertDialog
                            heading="Delete a Record?"
                            bodyText="Are you sure, you want to delete this record?. This is cannot revers after delete"
                            state={true}
                            alertResult={alertResult}
                        />
                    )}
                </MainCard>
                <Dialog
                    open={open}
                    onClose={handleCloseForm}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    disableEscapeKeyDown
                >
                    <DialogTitle id="alert-dialog-title" style={{ fontWeight: 'bold', fontSize: '13pt' }}>
                        {currentId ? 'Edit Employee Details' : 'Register New Employee'}
                    </DialogTitle>
                    <DialogContent>
                        <EmpForm employee={employee} handleSubmitForm={handleSubmitForm} error={error} _isSubmitting={isFormSubmitting} />
                    </DialogContent>
                    <DialogActions>
                        {/* <Button onClick={handleCloseForm}>Disagree</Button> */}
                        <Button disabled={isFormSubmitting} onClick={handleCloseForm} autoFocus>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
                <CustomizedSnackbars ref={alertRef} state={isShowSnackbar} message="Successfully saved!" />
            </Grid>
        </Grid>
    );
};

export default Employees;
