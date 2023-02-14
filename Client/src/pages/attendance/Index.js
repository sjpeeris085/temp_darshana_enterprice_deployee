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
    LinearProgress
} from '@mui/material';
import CSVReader from 'react-csv-reader';
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

import AnimateButton from 'components/@extended/AnimateButton';
import * as api from '../../store/api';
import { ALERT, TABLE_MODE } from 'constants/commonConstants.js';
import EmployeeTable from './Table';
import AttendanceModel from './AttendanceModel';

const Attendance = () => {
    const dispatch = useDispatch(); // to dispatch the actions
    const { numberOfPages, employees } = useSelector((state) => state.employees);
    const [currentId, setCurrentId] = useState(0);

    const employee = useSelector((state) => (currentId ? state.employees.employees.find((s) => s._id === currentId) : null));
    const [page, setPage] = useState(1);

    const [isProgress, setIsProgress] = useState(false);
    const [progressTitle, setProgressTitle] = useState(false);

    const [csvData, setCsvData] = useState({ data: [], fileInfo: {} });

    //table filter
    const [searchText, setSearchText] = useState('');
    const prevSearchTextRef = useRef();
    const [formDateTime, setFormDateTime] = React.useState(dayjs());
    const [tableMode, setTableMode] = React.useState(TABLE_MODE.SAVED);

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
        year: formYear,
        month: formMonth
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

    useEffect(() => {
        console.log(`tableMode =============> ${tableMode}`);
        if (page && formYear && formMonth) dispatch(getEmployeesWithAttendance(page, monthStart, monthEnd));
        if (tableMode === TABLE_MODE.SAVED) {
            setAttendanceFromDB();
        } else if (tableMode === TABLE_MODE.CSV) {
            setAttendance([]);
        }
    }, [tableMode]);

    useEffect(() => {
        prevSearchTextRef.current = searchText; //access previouse search text : prevSearchTextRef.current
        searchEmployees();
    }, [searchText]);

    //https://mui.com/material-ui/react-pagination/  [Controlled pagination]
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleTimesClick = (emp_id) => {
        if (tableMode === TABLE_MODE.CSV) {
            if (attendance.length < 0) return;
            //find time stamps
            const index = attendance.findIndex((index) => index.emp_id === emp_id);
            setCurrentEmployeeAttendance(attendance.at(index).dates);
        } else {
            const selectedEmp = employees.find((item) => item.emp_id === emp_id);
            console.log(employees);
            console.log(`=========== selectedEmp ${emp_id}`);
            console.log(selectedEmp);
            setCurrentEmployeeAttendance(selectedEmp.attendance);
            console.log(selectedEmp.attendance);
        }
        //find employee
        const employee = employees.find((item) => item.emp_id === emp_id);
        setCurrentId(employee._id);
        setOpenATPopup(true);
    };

    const searchEmployees = () => {
        if (searchText.trim()) {
            //fetch by search
            dispatch(getEmployeesBySearch(searchText));
        } else {
            //fetch all
            if (page && formYear && formMonth) {
                dispatch(getEmployeesWithAttendance(page, monthStart, monthEnd));
            }
        }
    };

    const handleYearMonthFilterChange = (newValue) => {
        const _date = dayjs(newValue);
        // setMonth(_date.month() + 1);
        // setYear(_date.year());
    };

    const handleFormMonthYearChange = (value) => {
        setFormDateTime(value);
        const month = dayjs(value).month() + 1;
        setFormMonth(month);
        const year = dayjs(value).year();
        setFormYear(year);
        setFormData({ ...formData, year: year, month: month });
    };

    const handleSubmitForm = async (e) => {};

    //doc:  https://github.com/nzambello/react-csv-reader#readme
    // more config: https://www.papaparse.com/docs#config
    // e.g.: https://codesandbox.io/s/react-csv-reader-vtull?file=/src/index.js
    const papaparseOptions = {
        header: false,
        dynamicTyping: true,
        skipEmptyLines: true
        // transformHeader: (header) => header.toLowerCase().replace(/\W/g, '_')
    };

    const hadleFileSelected = (data, fileInfo) => {
        setCsvData({ data, fileInfo });
    };

    async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }

    const calculateAttendance = async () => {
        let attendance = [];
        setTableMode(TABLE_MODE.CSV);

        console.log(`datesInMonth ======> ${formMonth}`);
        console.log(datesInMonth);

        employees.map((emp) => {
            let attObj = {
                emp_id: emp.emp_id,
                dates: []
            };
            csvData.data.map((item) => {
                if (item[0].toString() === emp.emp_id) {
                    attObj.dates.push(item[1]);
                }
            });
            attendance.push(attObj);
        });

        let empDA = []; //employee daly attendance

        await asyncForEach(employees, async (emp, index) => {
            //employees.map((emp) => {
            const empDates = attendance.filter((item) => item.emp_id === emp.emp_id);
            // console.log(empDates[0].dates);
            let empTimes = {
                emp_id: emp.emp_id,
                dates: []
            };

            await asyncForEach(datesInMonth, async (day, index) => {
                //  datesInMonth.map((day) => {
                const result = empDates[0].dates.filter((item) => {
                    return dayjs(item).isBetween(day.start, dayjs(day.end));
                });
                if (result.length > 0) {
                    // in & out found
                    if (result.length === 2) {
                        let _in = '';
                        let _out = '';
                        if (dayjs(result[0]).isBefore(dayjs(result[1]))) {
                            _in = result[0];
                            _out = result[1];
                        } else {
                            _in = result[1];
                            _out = result[0];
                        }

                        const { totalNormalWH, totalOTHours } = await calculateOTAndWorkHours(day.start, _in, _out);

                        let obj = {
                            date: dayjs(day.start).format('YYYY-MM-DD'),
                            is_present: true,
                            in: _in,
                            out: _out,
                            work_hours: totalNormalWH,
                            ot_hours: totalOTHours
                        };
                        empTimes.dates.push(obj);
                        // only 'in' or 'out' found
                    } else if (result.length === 1) {
                        let obj = {
                            date: dayjs(day.start).format('YYYY-MM-DD'),
                            is_present: true,
                            in: result[0],
                            out: '',
                            work_hours: 0,
                            ot_hours: 0
                        };
                        empTimes.dates.push(obj);
                    } // in or out not found (absense)
                } else {
                    let obj = {
                        date: dayjs(day.start).format('YYYY-MM-DD'),
                        is_present: false,
                        in: '',
                        out: '',
                        work_hours: 0,
                        ot_hours: 0
                    };
                    empTimes.dates.push(obj);
                }
            });
            empDA.push(empTimes);
        });

        /*
        let size = 0;
        attendance.forEach((item, index) => {
            if (item.dates.length > size) {
                size = item.dates.length;
            }
        });

        console.log(`Largest Size: ${size}`);
        */

        setAttendance(empDA);
        console.log('attendance');
        console.log(empDA);
    };

    useEffect(() => {
        if (tableMode === TABLE_MODE.SAVED) {
            setAttendanceFromDB();
        }
    }, [employees]);

    const setAttendanceFromDB = () => {
        let attendanceList = employees.map((employee) => ({ emp_id: employee.emp_id, dates: employee.attendance }));
        setAttendance(attendanceList);
    };

    const calculateOTAndWorkHours = (date, _in_, _out_) => {
        return new Promise((resolve, reject) => {
            try {
                const dayString = dayjs(date).format('YYYY-MM-DD');

                const _in = dayjs(`${dayString} ${dayjs(_in_).format('HH:mm:ss')}`);
                const _out = dayjs(`${dayString} ${dayjs(_out_).format('HH:mm:ss')}`);
                // const diff = _out.diff(_in, 'hour', true).toFixed(2);

                const DAY_START = dayjs(`${dayString} 8:00`);
                const DAY_END = dayjs(`${dayString} 17:00`);

                let morningOT = DAY_START.diff(_in, 'hour', true).toFixed(2);
                morningOT = morningOT < 0 ? 0 : morningOT;
                console.log(`morning OT: ${morningOT}`);

                let eveningOT = _out.diff(DAY_END, 'hour', true).toFixed(2);
                eveningOT = eveningOT < 0 ? 0 : eveningOT;
                console.log(`evening OT: ${eveningOT}`);

                const totalHours = _out.diff(_in, 'hour', true).toFixed(2);
                console.log(`total Hours: ${totalHours}`);

                const totalOTHours = parseFloat(morningOT) + parseFloat(eveningOT);
                console.log(`total OT Hours: ${totalOTHours}`);

                const totalNormalWH = parseFloat(totalHours) - totalOTHours;
                console.log(`total Normal W-Hours: ${totalNormalWH}`);

                resolve({ totalNormalWH, totalOTHours });
            } catch (error) {
                reject(error);
            }
        });
    };

    const updateAttendanceRow = async (attendanceObj) => {
        console.log('================= attendanceObj');
        console.log(attendanceObj);
        console.log('================= attendance list');
        console.log(attendance);

        const index = attendance.findIndex((index) => index.emp_id === attendanceObj.emp_id);
        const dates = attendance.at(index).dates;
        console.log('================= dates');
        console.log(dates);
        const dateIndex = attendance.at(index).dates.findIndex((index) => index.date === attendanceObj.date);
        const attendanceDate = attendance.at(index).dates.at(dateIndex);

        const filteredDates = dates.filter((item) => item.date !== attendanceDate.date);

        console.log('================= filteredDates');
        console.log(filteredDates);
        console.log('================= attendanceDate');
        console.log(attendanceDate);

        attendanceDate.is_present = attendanceObj.is_present;
        attendanceDate.work_hours = 0;
        attendanceDate.ot_hours = 0;
        if (!attendanceObj.is_present) {
            attendanceDate.in = 0;
            attendanceDate.out = 0;
        } else {
            attendanceDate.in = attendanceObj.in;
            attendanceDate.out = attendanceObj.out;
            // TODO: calculate WH and OT & Assign new value
            // Ref: https://day.js.org/docs/en/display/difference
            // Day js Sandbox : https://codesandbox.io/s/2pj6d?file=/src/index.js

            // Calculate OT and WH
            if (attendanceObj.in !== '' && attendanceObj.out !== '') {
                const { totalNormalWH, totalOTHours } = await calculateOTAndWorkHours(
                    attendanceObj.date,
                    attendanceDate.in,
                    attendanceDate.out
                );
                attendanceDate.work_hours = totalNormalWH;
                attendanceDate.ot_hours = totalOTHours;
            }
        }

        let updatedAttendanceObj = {
            emp_id: attendanceObj.emp_id,
            dates: [...filteredDates, attendanceDate]
        };
        console.log('====================== updatedAttendanceObj');
        console.log(updatedAttendanceObj);

        updatedAttendanceObj.dates.sort(function (a, b) {
            return new Date(a.date) - new Date(b.date);
        });

        const newList = attendance.map((att) => (att.emp_id === attendanceObj.emp_id ? updatedAttendanceObj : att));
        setAttendance(newList);

        console.log('====================== newList');
        console.log(newList);
    };

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* Form */}
            <Grid item xs={12} md={5} lg={4}>
                <MainCard sx={{ mt: 2 }} content={true}>
                    <Box sx={{ p: 2, pb: 0 }}></Box>
                    <form noValidate onSubmit={handleSubmitForm}>
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
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <CSVReader
                                        cssClass="react-csv-input"
                                        label="Select CSV with secret Death Star statistics"
                                        onFileLoaded={hadleFileSelected}
                                        parserOptions={papaparseOptions}
                                        inputStyle={{ color: 'blue' }}
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
                                        type="reset"
                                        variant="contained"
                                        color="primary"
                                        onClick={calculateAttendance}
                                    >
                                        Calculate
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                </MainCard>
            </Grid>
            {/* Table */}
            <Grid item xs={12} md={7} lg={8}>
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
                                        // onChange={(newValue) => {
                                        //     setFormDateTime(newValue);
                                        //     handleYearMonthFilterChange(newValue);
                                        // }}
                                        onChange={handleFormMonthYearChange}
                                        renderInput={(params) => <TextField {...params} helperText={null} />}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                            {/* Radio Button DB View*/}
                            <FormControl>
                                <ButtonGroup size="large" aria-label="large button group">
                                    <Button
                                        key="btn_csv"
                                        variant={tableMode === TABLE_MODE.CSV ? 'contained' : 'outlined'}
                                        onClick={() => setTableMode(TABLE_MODE.CSV)}
                                    >
                                        CSV
                                    </Button>
                                    <Button
                                        key="btn_saved"
                                        variant={tableMode === TABLE_MODE.CSV ? 'outlined' : 'contained'}
                                        onClick={() => setTableMode(TABLE_MODE.SAVED)}
                                    >
                                        Saved
                                    </Button>
                                </ButtonGroup>
                            </FormControl>
                        </ListItem>
                    </List>
                    <EmployeeTable tableMode={tableMode} handleTimesClick={handleTimesClick} hasAttendance={attendance.length > 0} />
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
                updateRow={updateAttendanceRow}
                tableMode={tableMode}
            />
        </Grid>
    );
};

export default Attendance;
