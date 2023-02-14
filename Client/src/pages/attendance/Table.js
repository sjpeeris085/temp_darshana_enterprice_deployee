import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
    CircularProgress,
    Tooltip
} from '@mui/material';
import { FieldTimeOutlined, CheckCircleOutlined, ExclamationCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';

// project import
import { ALERT, TABLE_MODE } from 'constants/commonConstants.js';
import Dot from 'components/@extended/Dot';

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
        id: 'employee_id',
        align: 'left',
        disablePadding: false,
        label: 'Employee'
    },
    {
        id: 'name',
        align: 'left',
        disablePadding: true,
        label: 'Name'
    },
    {
        id: 'nic',
        align: 'left',
        disablePadding: true,
        label: 'NIC'
    },
    {
        id: 'designation',
        align: 'left',
        disablePadding: false,
        label: 'Designation'
    },
    {
        id: 'saved',
        align: 'right',
        disablePadding: false,
        label: 'Saved'
    },
    {
        id: 'timestamps',
        align: 'right',
        disablePadding: false,
        label: 'Timestamps'
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

const EmployeeTable = ({ tableMode, handleTimesClick, hasAttendance }) => {
    const [order] = useState('asc');
    const [orderBy] = useState('trackingNo');
    const [selected] = useState([]);

    const { employees, isLoading } = useSelector((state) => state.employees);

    rows = employees;

    const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

    const handleClickTimes = (emp_id) => {
        handleTimesClick(emp_id);
    };

    return isLoading ? (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
            <CircularProgress />
        </Box>
    ) : (
        <>
            <Box>
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
                                        key={row._id}
                                        selected={isItemSelected}
                                    >
                                        <TableCell component="th" id={labelId} scope="row" align="left">
                                            <Link color="secondary" component={RouterLink} to="">
                                                {row.emp_id}
                                            </Link>
                                        </TableCell>
                                        <TableCell align="left">{row.full_name}</TableCell>
                                        <TableCell align="left">{row.nic}</TableCell>
                                        <TableCell align="left">{row.designation}</TableCell>
                                        <TableCell align="right">
                                            {/* hasAttendance || row.isAttendanceSaved */}
                                            {(tableMode.CSV ? hasAttendance : row.isAttendanceSaved) ? (
                                                <Tooltip title={row.isAttendanceSaved ? 'Attendace Saved' : 'Attendance Not Saved'}>
                                                    <IconButton size="large" color="secondary">
                                                        {row.isAttendanceSaved ? (
                                                            <CheckCircleOutlined style={{ color: '#23D18B' }} />
                                                        ) : (
                                                            <ExclamationCircleOutlined style={{ color: '#FFCA28' }} />
                                                        )}
                                                    </IconButton>
                                                </Tooltip>
                                            ) : (
                                                <Tooltip title="No Timestamps found">
                                                    <QuestionCircleOutlined />
                                                </Tooltip>
                                            )}
                                        </TableCell>
                                        <TableCell align="right">
                                            {hasAttendance || row.isAttendanceSaved ? (
                                                <IconButton
                                                    disabled={tableMode === TABLE_MODE.SAVED ? !row.isAttendanceSaved : false}
                                                    size="large"
                                                    color="secondary"
                                                    onClick={() => handleClickTimes(row.emp_id)}
                                                >
                                                    <FieldTimeOutlined
                                                        style={{
                                                            color: TABLE_MODE.SAVED
                                                                ? !row.isAttendanceSaved
                                                                    ? 'FFCA28'
                                                                    : '#1FA5AC'
                                                                : '#1FA5AC'
                                                        }}
                                                    />
                                                </IconButton>
                                            ) : (
                                                <Tooltip title="No Timestamps found">
                                                    <QuestionCircleOutlined />
                                                </Tooltip>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
};

export default EmployeeTable;
