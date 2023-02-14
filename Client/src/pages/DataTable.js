import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

// material-ui
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

// project import
import Dot from 'components/@extended/Dot';
import TABLES from 'constants/tableTypes';

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

let headCells = [
    {
        id: 'supplier_code',
        align: 'left',
        disablePadding: false,
        label: 'Supplier ID'
    },
    {
        id: 'name',
        align: 'left',
        disablePadding: true,
        label: 'Name'
    },
    {
        id: 'amount',
        align: 'left',
        disablePadding: false,
        label: 'Amount'
    },
    {
        id: 'date',
        align: 'left',
        disablePadding: false,
        label: 'Date'
    },
    {
        id: 'actions',
        align: 'right',
        disablePadding: false,
        label: 'Actions'
    }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function DataTableHead({ order, orderBy }) {
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

DataTableHead.propTypes = {
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

const DataTable = ({ tableType, dataList, isLoading, handleEdit, handleDelete }) => {
    const [order] = useState('asc');
    const [orderBy] = useState('trackingNo');
    const [selected] = useState([]);

    // const { tea_shoots, isLoading } = useSelector((state) => state.tea_shoots);
    rows = dataList;

    switch (tableType) {
        case TABLES.TEA_SHOOTS:
            headCells.map((item) => {
                if (item.id === 'amount') {
                    item.id = 'weightage';
                    item.label = 'Weightage';
                }
            });
            break;
        default:
            break;
    }

    const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

    const handleDeleteRecord = (teashoots_row_id) => {
        handleDelete(teashoots_row_id);
    };
    const handleEditRecord = (teashoots_row_id) => {
        handleEdit(teashoots_row_id);
    };

    const getFormatedDate = (date) => {
        return dayjs(date).format('DD/MM/YYYY HH:mm');
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
                        <DataTableHead order={order} orderBy={orderBy} />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
                                const isItemSelected = isSelected(row.trackingNo);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    dataList.length !== 0 && (
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
                                                    {row.supplier_code}
                                                </Link>
                                            </TableCell>
                                            <TableCell align="left">{`${row?.supplier?.name_initials} ${row?.supplier?.first_name} ${row.supplier?.last_name}`}</TableCell>
                                            <TableCell align="left">{tableType === TABLES.TEA_SHOOTS ? row.weight : row.amount}</TableCell>
                                            <TableCell align="left">{getFormatedDate(row.date)}</TableCell>
                                            <TableCell align="right">
                                                <IconButton size="large" color="secondary" onClick={() => handleDeleteRecord(row._id)}>
                                                    <DeleteOutlined style={{ color: '#FF6347' }} />
                                                </IconButton>
                                                <IconButton size="large" color="secondary" onClick={() => handleEditRecord(row._id)}>
                                                    <EditOutlined style={{ color: '#1FA5AC' }} />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
};

export default DataTable;
