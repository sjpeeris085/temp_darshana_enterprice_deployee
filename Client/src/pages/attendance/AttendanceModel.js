import React from 'react';
import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as api from '../../store/api';

// material-ui
import {
    Box,
    Link,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    IconButton,
    DialogTitle,
    DialogActions,
    Button,
    DialogContent,
    Dialog,
    FormControl,
    FormControlLabel,
    Switch,
    TextField
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// project import
import MainCard from 'components/MainCard';
import Dot from 'components/@extended/Dot';
import dayjs from 'dayjs';
import { ALERT, TABLE_MODE } from 'constants/commonConstants.js';

let rows = [];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
    {
        id: 'date',
        align: 'left',
        disablePadding: true,
        label: 'Date'
    },
    {
        id: 'present',
        align: 'left',
        disablePadding: true,
        label: 'Present'
    },
    {
        id: 'in',
        align: 'left',
        disablePadding: true,
        label: 'In'
    },
    {
        id: 'out',
        align: 'left',
        disablePadding: true,
        label: 'Out'
    },
    {
        id: 'working_h',
        align: 'left',
        disablePadding: true,
        label: 'Work H'
    },
    {
        id: 'ot_hours',
        align: 'left',
        disablePadding: true,
        label: 'OT H'
    }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

OrderTableHead.propTypes = {
    order: PropTypes.string,
    orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const OrderStatus = ({ status }) => {
    let color;
    let title;

    switch (status) {
        case 0:
            color = 'warning';
            title = 'Pending';
            break;
        case 1:
            color = 'success';
            title = 'Approved';
            break;
        case 2:
            color = 'error';
            title = 'Rejected';
            break;
        default:
            color = 'primary';
            title = 'None';
    }

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Dot color={color} />
            <Typography>{title}</Typography>
        </Stack>
    );
};

OrderStatus.propTypes = {
    status: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //

const AttendanceModel = ({ open, setOpen, employee, attendance, alertRef, year, month, updateRow, tableMode }) => {
    const dispatch = useDispatch(); // to dispatch the actions
    const [order] = useState('asc');
    const [orderBy] = useState('trackingNo');
    const [selected] = useState([]);
    //  console.log(employees);

    rows = attendance;

    const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

    const handleClickCompleteReview = async () => {
        console.log('=========== saveAttendance');
        console.log(attendance);
        try {
            const { data } = await api.saveAttendance({ data: attendance, employee_ref: employee._id, year, month });
            // dispatch({ type: '', payload: '' });

            alertRef.current.showAlert({ type: ALERT.SUCCESS, message: data?.message });
        } catch (error) {
            console.log(error);
            alertRef.current.showAlert({ type: ALERT.ERROR, message: error?.response?.data?.message });
        }
    };

    return (
        <Dialog
            fullWidth={true}
            maxWidth="lg"
            minwidth="lg"
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            disableEscapeKeyDown
        >
            <DialogTitle id="alert-dialog-title" style={{ fontWeight: 'bold', fontSize: '13pt' }}>
                Reviewing Timestamps of {`${employee?.full_name} (ID: ${employee?.emp_id} | ${year}-${month})`}
            </DialogTitle>
            <DialogContent>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <Box>
                        {attendance && (
                            <TableContainer
                                sx={{
                                    width: '100%',
                                    overflowX: 'auto',
                                    position: 'relative',
                                    display: 'block',
                                    maxWidth: '100%',
                                    '& td, & th': { whiteSpace: 'nowrap' }
                                }}
                            >
                                <Table
                                    aria-labelledby="tableTitle"
                                    sx={{
                                        '& .MuiTableCell-root:first-of-type': {
                                            pl: 2
                                        },
                                        '& .MuiTableCell-root:last-child': {
                                            pr: 3
                                        }
                                    }}
                                >
                                    <OrderTableHead order={order} orderBy={orderBy} />
                                    <TableBody>
                                        {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
                                            const isItemSelected = isSelected(row.trackingNo);
                                            const labelId = `enhanced-table-checkbox-${index}`;

                                            return (
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={row.date}
                                                    selected={isItemSelected}
                                                >
                                                    <TableCell align="left">{dayjs(row.date).format('DD/MM/YYYY')}</TableCell>
                                                    <TableCell align="left" style={{ color: row.is_present ? 'green' : 'tomato' }}>
                                                        <FormControl>
                                                            <FormControlLabel
                                                                control={
                                                                    <Switch
                                                                        defaultChecked={row.is_present}
                                                                        onChange={(e) => {
                                                                            updateRow({
                                                                                ...row,
                                                                                is_present: e.target.checked,
                                                                                emp_id: employee.emp_id
                                                                            });
                                                                        }}
                                                                    />
                                                                }
                                                                label={row.is_present ? 'Present' : 'Absent'}
                                                            />
                                                        </FormControl>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <FormControl variant="standard">
                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                <TimePicker
                                                                    label="In"
                                                                    value={row.in !== '' ? row.in : ''}
                                                                    onChange={(value) => {
                                                                        updateRow({
                                                                            ...row,
                                                                            in: value,
                                                                            emp_id: employee.emp_id
                                                                        });
                                                                    }}
                                                                    disabled={!row.is_present}
                                                                    renderInput={(params) => <TextField {...params} />}
                                                                />
                                                            </LocalizationProvider>
                                                        </FormControl>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <TimePicker
                                                                label="out"
                                                                value={row.in !== '' ? row.out : ''}
                                                                onChange={(value) => {
                                                                    updateRow({
                                                                        ...row,
                                                                        out: value,
                                                                        emp_id: employee.emp_id
                                                                    });
                                                                }}
                                                                disabled={!row.is_present}
                                                                renderInput={(params) => <TextField {...params} />}
                                                            />
                                                        </LocalizationProvider>
                                                    </TableCell>
                                                    <TableCell align="left">{row.work_hours ? row.work_hours : 0}</TableCell>
                                                    <TableCell align="left">{row.ot_hours ? row.ot_hours : 0}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </Box>
                </MainCard>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClickCompleteReview}>
                    {tableMode === TABLE_MODE.CSV ? 'Complete Review & Save' : 'Save changes'}
                </Button>
                <Button onClick={() => setOpen(false)} autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AttendanceModel;
