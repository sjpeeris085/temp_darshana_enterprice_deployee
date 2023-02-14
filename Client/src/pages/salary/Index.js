import React, { useEffect, useRef, useState } from 'react';
import {
    Box,
    Typography,
    Stack,
    Button,
    ButtonGroup,
    FormControl,
    InputAdornment,
    OutlinedInput,
    List,
    ListItem,
    TextField,
    Grid,
    Pagination,
    LinearProgress,
    CircularProgress,
    InputLabel,
    FormHelperText
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { SearchOutlined } from '@ant-design/icons';

// project import
import CustomizedSnackbars from 'components/Snackbar/CustomizedSnackbars';
import MainCard from 'components/MainCard';
import { getEmployeesWithAttendance, getEmployeesBySearch } from 'store/actions/employee';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

import AnimateButton from 'components/@extended/AnimateButton';
import * as api from '../../store/api';
import { ALERT } from 'constants/commonConstants.js';
import EmployeeTable from './Table';
import AttendanceModel from './AttendanceModel';
import { async } from 'q';

const Salary = () => {
    const dispatch = useDispatch(); // to dispatch the actions
    const { numberOfPages, employees } = useSelector((state) => state.employees);
    const [currentId, setCurrentId] = useState(0);

    const employee = useSelector((state) => (currentId ? state.employees.employees.find((s) => s._id === currentId) : null));
    const [page, setPage] = useState(1);

    const [isProgress, setIsProgress] = useState(false);
    const [progressTitle, setProgressTitle] = useState(false);

    //table filter
    const [searchText, setSearchText] = useState('');
    const prevSearchTextRef = useRef();
    const [formDateTime, setFormDateTime] = React.useState(dayjs());
    const [error, setError] = useState('');

    const OT_RATE = 104.0;
    const BASIC_PER_DAY = 833.0;

    const [formMonth, setFormMonth] = React.useState();
    const [formYear, setFormYear] = React.useState();
    const [datesInMonth, setDatesInMonth] = useState([]);
    const [monthStart, setMonthStart] = useState('');
    const [monthEnd, setMonthEnd] = useState('');
    const [attendance, setAttendance] = useState([]);
    const [openATPopup, setOpenATPopup] = React.useState(false);
    const [currentEmployeeAttendance, setCurrentEmployeeAttendance] = React.useState('');
    const alertRef = useRef();

    const [formData, setFormData] = useState({
        emp_id: '',
        year: formYear,
        month: formMonth,
        basic_salary: 0,
        present_days: 0,
        absent_days: 0,
        day_hours: 0,
        normal_ot: 0,
        earnings_for_normal_ot: 0,
        sunday_ot: 0,
        earnings_for_sunday_ot: 0,
        deduct_for_absent: 0,
        deduct_for_advance: 0,
        allowance: 0,
        total_earnings: 0,
        net_salary: 0,
        user_ref: ''
    });

    const [summations, setSummations] = useState({
        with_normal_OT: 0,
        with_sunday_OT: 0,
        with_absent: 0,
        with_advance: 0,
        with_allowance: 0
    });

    useEffect(() => {
        const daysInMonth = dayjs(`${formYear}-${formMonth}-01`).daysInMonth();

        let dates = [];
        for (let i = 1; i <= parseInt(daysInMonth); i++) {
            const date = dayjs(`${formYear}-${formMonth}-${i}`);
            const start = date.startOf('day');
            const end = date.endOf('day');
            dates.push({ start, end });
        }
        setDatesInMonth(dates);
        setMonthStart(dayjs(`${formYear}-${formMonth}-01`).format('YYYY-MM-DD'));
        setMonthEnd(dayjs(`${formYear}-${formMonth}-${daysInMonth}`).format('YYYY-MM-DD'));

        if (page && formYear && formMonth) {
            dispatch(
                getEmployeesWithAttendance(
                    page,
                    dayjs(`${formYear}-${formMonth}-01`).format('YYYY-MM-DD'),
                    dayjs(`${formYear}-${formMonth}-${daysInMonth}`).format('YYYY-MM-DD')
                )
            );
        }
    }, [formMonth, formYear]);

    useEffect(() => {
        //Get the First day of the Previous Month
        const now = dayjs();
        const thisMonth = dayjs(now);

        //set default dates form form
        setFormDateTime(dayjs(thisMonth).format());
        setFormMonth(dayjs(thisMonth).month() + 1);
        setFormYear(dayjs(thisMonth).year());

        //set default formMonth,year for default form data
        setFormData({ ...formData, month: dayjs(thisMonth).month() + 1, year: dayjs(thisMonth).year() });
    }, []);

    useEffect(() => {
        if (page && formYear && formMonth) dispatch(getEmployeesWithAttendance(page, monthStart, monthEnd));
    }, [page]);

    const handleFormMonthYearChange = (value) => {
        setFormDateTime(value);
        const month = dayjs(value).month() + 1;
        setFormMonth(month);
        const year = dayjs(value).year();
        setFormYear(year);
        setFormData({ ...formData, year: year, month: month });
    };

    //https://mui.com/material-ui/react-pagination/  [Controlled pagination]
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleTimesClick = (_id) => {
        const selectedEmp = employees.find((item) => item._id === _id);
        setCurrentEmployeeAttendance(selectedEmp.attendance);
        setCurrentId(_id);
        setOpenATPopup(true);
    };

    const selectEmployee = (_id) => {
        const selectedEmp = employees.find((item) => item._id === _id);
        setCurrentEmployeeAttendance(selectedEmp.attendance);
        setCurrentId(_id);
    };

    useEffect(() => {
        calculateSalary(false);
    }, [currentEmployeeAttendance]);

    useEffect(() => {
        // calculateSalary();
        // console.log('=========== formData');
        // console.log(formData);
    }, [formData]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        calculateSalary(true);
    };

    const calculateSalary = (isRecalculate) => {
        if (!employee) return;
        if (!currentEmployeeAttendance) return;

        let normalOT = formData.normal_ot;
        let sundayOT = formData.sunday_ot;
        let dayHours = formData.day_hours;
        let presentDates = formData.present_days;
        let absentDates = formData.absent_days;

        let with_normal_OT = 0;
        let with_sunday_OT = 0;
        let with_absent = 0;
        let with_advance = 0;
        let with_allowance = 0;

        if (!isRecalculate) {
            currentEmployeeAttendance.map((day) => {
                if (day.is_present) {
                    presentDates++;
                    if (dayjs(day.date).get('day') !== 0) {
                        // 0 = Sunday, 6  = Saturday
                        normalOT += parseFloat(day.ot_hours);
                        dayHours += parseFloat(day.work_hours);
                    } else {
                        sundayOT += parseFloat(day.ot_hours) + parseFloat(day.work_hours);
                    }
                } else {
                    absentDates++;
                }
            });
        }

        if (currentEmployeeAttendance) {
            // add Normal OT
            let normalOTPayment = normalOT * OT_RATE;
            let totalSalary = normalOTPayment + employee.salary;
            with_normal_OT = totalSalary;

            // add Sunday OT
            let sundayOTPayment = sundayOT * OT_RATE;
            totalSalary += sundayOTPayment;
            with_sunday_OT = totalSalary;

            // deduction for Absent
            let deductionForAbsent = absentDates * BASIC_PER_DAY;
            totalSalary -= deductionForAbsent;
            with_absent = totalSalary;

            // deduction for Advance
            totalSalary -= parseFloat(formData.deduct_for_advance);
            with_advance = totalSalary;

            //Add allowance
            totalSalary += parseFloat(formData.allowance);
            with_allowance = totalSalary;

            setFormData({
                ...formData,
                deduct_for_absent: deductionForAbsent,
                earnings_for_sunday_ot: sundayOTPayment,
                sunday_ot: sundayOT,
                normal_ot: normalOT,
                earnings_for_normal_ot: normalOTPayment,
                day_hours: dayHours,
                present_days: presentDates,
                absent_days: absentDates,
                net_salary: totalSalary,
                emp_id: employee.emp_id,
                user_ref: employee._id,
                basic_salary: employee.salary,
                year: formYear,
                month: formMonth
            });

            setSummations({
                with_normal_OT: with_normal_OT,
                with_sunday_OT: with_sunday_OT,
                with_absent: with_absent,
                with_advance: with_advance,
                with_allowance: with_allowance
            });
        }
    };

    const savePaysheet = async () => {
        try {
            setIsProgress(true);
            const { data } = await api.saveSalary(formData);

            setIsProgress(false);
            setCurrentId(null);
            setError('');
            alertRef.current.showAlert({ type: ALERT.SUCCESS, message: 'Successfully saved' });
            resetForm();
        } catch (error) {
            alertRef.current.showAlert({ type: ALERT.ERROR, message: error?.response?.data?.message });
            setError(error?.response?.data?.message);
            setIsProgress(false);
        }
    };

    const resetForm = () => {
        setFormData({
            emp_id: '',
            year: formYear,
            month: formMonth,
            present_days: 0,
            absent_days: 0,
            day_hours: 0,
            normal_ot: 0,
            earnings_for_normal_ot: 0,
            sunday_ot: 0,
            earnings_for_sunday_ot: 0,
            deduct_for_absent: 0,
            deduct_for_advance: 0,
            allowance: 0,
            total_earnings: 0,
            net_salary: 0,
            user_ref: ''
        });
    };

    const downloadBill = async () => {
        setIsProgress(true);
        setProgressTitle('Downloading...');
        fetch(`http://localhost:5000/salary/get-paysheet?year=${formData.year}&month=${formData.month}&emp_id=${formData.emp_id}`).then(
            (response) => {
                response.blob().then((blob) => {
                    // Creating new object of PDF file
                    const fileURL = window.URL.createObjectURL(blob);
                    // Setting various property values
                    let alink = document.createElement('a');
                    alink.href = fileURL;
                    alink.download = `monthly_bill_of_${formMonth}-${formYear}.pdf`;
                    alink.click();
                    setIsProgress(false);
                    setProgressTitle('');
                });
            }
        );
    };

    const openInBrowser = () => {
        const url = `http://localhost:5000/salary/get-paysheet?year=${formData.year}&month=${formData.month}&emp_id=${formData.emp_id}`;
        window.open(url, '_blank', 'noreferrer');
    };

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* Form */}
            <Grid item xs={12} md={5} lg={5}>
                <MainCard sx={{ mt: 2 }} content={true}>
                    <Box sx={{ p: 2, pb: 0 }}></Box>
                    <form noValidate onSubmit={handleFormSubmit}>
                        <Grid container spacing={3}>
                            {/* Year & month*/}
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <FormControl variant="standard">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                views={['year', 'month']}
                                                label="Year and Month"
                                                minDate={dayjs('2012-03-01')}
                                                maxDate={dayjs('2060-06-01')}
                                                value={formDateTime}
                                                onChange={handleFormMonthYearChange}
                                                renderInput={(params) => <TextField {...params} helperText={null} />}
                                            />
                                        </LocalizationProvider>
                                    </FormControl>
                                </Stack>
                            </Grid>
                            {/* Employee */}
                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="employee">Employee</InputLabel>
                                    <OutlinedInput
                                        id="employee"
                                        type="text"
                                        value={employee ? ` ${employee.emp_id} - ${employee.first_name} ${employee.last_name}` : ''}
                                        name="employee"
                                        onChange={() => {}}
                                        disabled={false}
                                        readOnly={true}
                                        style={{ color: '#096DD9' }}
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>
                            {/* Basic Salary */}
                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="employee">Basic Salary</InputLabel>
                                    <OutlinedInput
                                        id="basic_salary"
                                        type="text"
                                        value={employee ? employee.salary : ''}
                                        name="basic_salary"
                                        onChange={() => {}}
                                        disabled={false}
                                        readOnly={true}
                                        style={{ color: '#096DD9' }}
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>
                            {/* No of Present */}
                            <Grid item xs={12} md={3}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="present_days">Present Days</InputLabel>
                                    <OutlinedInput
                                        id="present_days"
                                        type="number"
                                        value={formData.present_days}
                                        name="present_days"
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                present_days: e.target.value.toString().trim() === '' ? 0 : e.target.value
                                            });
                                        }}
                                        disabled={false}
                                        style={{ color: '#36C656' }}
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>
                            {/* Total Day hours */}
                            <Grid item xs={12} md={5}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="day_hours">Day Hours {`(8:00-17:00)`}</InputLabel>
                                    <OutlinedInput
                                        id="day_hours"
                                        type="text"
                                        value={formData.day_hours}
                                        name="day_hours"
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                day_hours: e.target.value.toString().trim() === '' ? 0 : e.target.value
                                            });
                                        }}
                                        disabled={false}
                                        style={{ color: '#641C54' }}
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>
                            {/* No of Absent */}
                            <Grid item xs={12} md={4}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="absent_days">Absent Days</InputLabel>
                                    <OutlinedInput
                                        id="absent_days"
                                        type="number"
                                        value={formData.absent_days}
                                        name="absent_days"
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                absent_days: e.target.value.toString().trim() === '' ? 0 : e.target.value
                                            });
                                        }}
                                        disabled={false}
                                        style={{ color: '#FEAC0A' }}
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>

                            {/* Normal OT */}
                            <Grid item xs={12} md={2}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="normal_ot">Normal OT {`| Rate: 000`}</InputLabel>
                                    <OutlinedInput
                                        id="normal_ot"
                                        type="text"
                                        value={formData.normal_ot}
                                        name="normal_ot"
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                normal_ot: e.target.value.toString().trim() === '' ? 0 : e.target.value
                                            });
                                        }}
                                        disabled={false}
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>
                            {/* Earnings for Normal OT */}
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="earnings_for_normal_ot">Earnings</InputLabel>
                                    <OutlinedInput
                                        id="earnings_for_normal_ot"
                                        type="text"
                                        value={formData.earnings_for_normal_ot}
                                        name="earnings_for_normal_ot"
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                earnings_for_normal_ot: e.target.value.toString().trim() === '' ? 0 : e.target.value
                                            });
                                        }}
                                        disabled={false}
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="with_normal_OT">=</InputLabel>
                                    <OutlinedInput
                                        id="with_normal_OT"
                                        type="text"
                                        value={summations.with_normal_OT}
                                        disabled={true}
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>

                            {/* Sunday OT */}
                            <Grid item xs={12} md={2}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="sunday_ot">Sunday OT {`| Rate: 000`}</InputLabel>
                                    <OutlinedInput
                                        id="sunday_ot"
                                        type="text"
                                        value={formData.sunday_ot}
                                        name="sunday_ot"
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                sunday_ot: e.target.value.toString().trim() === '' ? 0 : e.target.value
                                            });
                                        }}
                                        disabled={false}
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>
                            {/* Earnings for Sunday OT */}
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="earnings_for_sunday_ot">Earnings</InputLabel>
                                    <OutlinedInput
                                        id="earnings_for_sunday_ot"
                                        type="text"
                                        value={formData.earnings_for_sunday_ot}
                                        name="earnings_for_sunday_ot"
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                earnings_for_sunday_ot: e.target.value.toString().trim() === '' ? 0 : e.target.value
                                            });
                                        }}
                                        disabled={false}
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="with_sunday_OT">=</InputLabel>
                                    <OutlinedInput
                                        id="with_sunday_OT"
                                        type="text"
                                        value={summations.with_sunday_OT}
                                        disabled={true}
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>

                            {/* Deduction Absent */}
                            <Grid item xs={12} md={8}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="deduct_for_absent">Deduction for Absent</InputLabel>
                                    <OutlinedInput
                                        id="deduct_for_absent"
                                        type="text"
                                        value={formData.deduct_for_absent}
                                        name="deduct_for_absent"
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                deduct_for_absent: e.target.value.toString().trim() === '' ? 0 : e.target.value
                                            });
                                        }}
                                        disabled={false}
                                        style={{ color: '#FEAC0A' }}
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="with_absent">=</InputLabel>
                                    <OutlinedInput id="with_absent" type="text" value={summations.with_absent} disabled={true} fullWidth />
                                </Stack>
                            </Grid>

                            {/* Deduction Advance */}
                            <Grid item xs={12} md={8}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="deduct_for_advance">Deduction for Advance</InputLabel>
                                    <OutlinedInput
                                        id="deduct_for_advance"
                                        type="text"
                                        value={formData.deduct_for_advance}
                                        name="deduct_for_advance"
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                deduct_for_advance: e.target.value.toString().trim() === '' ? 0 : e.target.value
                                            });
                                        }}
                                        disabled={false}
                                        style={{ color: '#FEAC0A' }}
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="with_advance">=</InputLabel>
                                    <OutlinedInput
                                        id="with_advance"
                                        type="text"
                                        value={summations.with_advance}
                                        disabled={true}
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>

                            {/* Allowance */}
                            <Grid item xs={12} md={8}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="allowance">Allowance</InputLabel>
                                    <OutlinedInput
                                        id="allowance"
                                        type="number"
                                        value={formData.allowance}
                                        name="allowance"
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                allowance: e.target.value.toString().trim() === '' ? 0 : e.target.value
                                            });
                                        }}
                                        disabled={false}
                                        style={{ color: '#36C656' }}
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="with_allowance">=</InputLabel>
                                    <OutlinedInput
                                        id="with_allowance"
                                        type="text"
                                        value={summations.with_allowance}
                                        disabled={true}
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>

                            {/* Net Salary */}
                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="net_salary">Net Salary</InputLabel>
                                    <OutlinedInput
                                        id="net_salary"
                                        type="number"
                                        value={formData.net_salary}
                                        name="net_salary"
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                net_salary: e.target.value.toString().trim() === '' ? 0 : e.target.value
                                            });
                                        }}
                                        disabled={false}
                                        style={{ color: '#096DD9' }}
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>
                            {/* Progress Bar */}
                            <Grid item xs={12}>
                                {isProgress && (
                                    <Box sx={{ width: '100%', marginTop: '10px' }}>
                                        <Typography>{progressTitle}</Typography>
                                        <LinearProgress />
                                    </Box>
                                )}
                            </Grid>
                            {/* Calculate Button */}
                            <Grid item xs={12} md={12}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isProgress}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Calculate
                                    </Button>
                                </AnimateButton>
                            </Grid>
                            {/* Save Button */}
                            <Grid item xs={12} md={12}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isProgress}
                                        fullWidth
                                        size="large"
                                        type="button"
                                        variant="contained"
                                        color="primary"
                                        onClick={savePaysheet}
                                    >
                                        Save Paysheet
                                    </Button>
                                </AnimateButton>
                            </Grid>

                            {/* Button */}
                            <Grid item xs={12} md={6}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isProgress}
                                        fullWidth
                                        size="large"
                                        type="reset"
                                        variant="contained"
                                        color="success"
                                        onClick={downloadBill}
                                    >
                                        download paysheet
                                    </Button>
                                </AnimateButton>
                            </Grid>
                            {/* Button */}
                            <Grid item xs={12} md={6}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isProgress}
                                        fullWidth
                                        size="large"
                                        type="reset"
                                        variant="contained"
                                        color="success"
                                        onClick={openInBrowser}
                                    >
                                        Open in browser
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                </MainCard>
            </Grid>
            {/* Table */}
            <Grid item xs={12} md={7} lg={7}>
                <MainCard sx={{ mt: 2 }} content={false}>
                    {/* Table Filtering */}
                    <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
                        <ListItem divider>
                            {/* Search bar */}
                            <FormControl sx={{ width: { xs: '60%', md: '60%' } }}>
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
                                        'aria-label': 'amount'
                                    }}
                                    placeholder="Search by supplier"
                                />
                            </FormControl>
                            {/* Year & month*/}
                            <FormControl sx={{ m: 1 }} variant="standard">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        views={['year', 'month']}
                                        label="Year and Month"
                                        minDate={dayjs('2012-03-01')}
                                        maxDate={dayjs('2060-06-01')}
                                        value={formDateTime}
                                        onChange={handleFormMonthYearChange}
                                        renderInput={(params) => <TextField {...params} helperText={null} />}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </ListItem>
                    </List>
                    <EmployeeTable
                        selectEmployee={selectEmployee}
                        handleTimesClick={handleTimesClick}
                        hasAttendance={attendance.length > 0}
                    />
                    {!searchText && (
                        <Stack spacing={2} style={{ padding: '15px' }}>
                            <Typography>
                                Page: {page} of {numberOfPages}
                            </Typography>
                            <Pagination count={numberOfPages} page={page} onChange={handlePageChange} />
                        </Stack>
                    )}
                </MainCard>
                <CustomizedSnackbars ref={alertRef} message="Successfully saved!" />
            </Grid>
            <AttendanceModel
                open={openATPopup}
                setOpen={setOpenATPopup}
                employee={employee}
                attendance={currentEmployeeAttendance}
                alertRef={alertRef}
                year={formYear}
                month={formMonth}
            />
        </Grid>
    );
};
export default Salary;
