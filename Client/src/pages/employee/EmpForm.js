import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {
    Button,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    Stack,
    Box,
    CircularProgress,
    Typography,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    Divider,
    Select,
    MenuItem,
    TextField,
    Chip
} from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

const EmpForm = ({ employee, handleSubmitForm, error, _isSubmitting }) => {
    console.log(employee);
    return (
        <>
            <Formik
                initialValues={{
                    role: 'EMPLOYEE',
                    emp_id: employee ? employee?.emp_id : '',
                    full_name: employee ? employee?.full_name : '',
                    first_name: employee ? employee?.first_name : '',
                    last_name: employee ? employee?.last_name : '',
                    tel: employee ? employee?.tel : '',
                    nic: employee ? employee?.nic : '',
                    email: employee ? employee?.user_ref.email : '',
                    address: employee ? employee?.address : '',
                    city: employee ? employee?.city : '',
                    image: employee ? employee?.image : '',
                    gender: employee ? employee?.gender : 'Male',
                    salary: employee ? employee?.salary : '',
                    designation: employee ? employee?.designation : '',
                    date_hired: employee ? employee?.date_hired : new Date()
                }}
                validationSchema={Yup.object().shape({
                    emp_id: Yup.string().max(255).required('Employee ID Required'),
                    full_name: Yup.string().max(255).required('Full Name Required'),
                    first_name: Yup.string().max(255).required('First Name Required'),
                    last_name: Yup.string().max(255).required('Last Name Required'),
                    tel: Yup.string().max(255),
                    nic: Yup.string().max(255).required('NIC No Required'),
                    email: Yup.string().email().max(255).required('Email Required'),
                    address: Yup.string().max(255),
                    city: Yup.string().max(255),
                    image: Yup.string().max(255),
                    gender: Yup.string().max(255).required('Gender Required'),
                    salary: Yup.number().required('Salary Required'),
                    designation: Yup.string().max(255).required('Designation Required'),
                    date_hired: Yup.string().max(255).required('Date hired Required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                    try {
                        setStatus({ success: false });
                        setSubmitting(false);
                        handleSubmitForm({
                            role: values.role,
                            emp_id: values.emp_id.trim(),
                            full_name: values.full_name.trim(),
                            first_name: values.first_name.trim(),
                            last_name: values.last_name.trim(),
                            tel: values.tel.trim(),
                            nic: values.nic.trim(),
                            email: values.email.trim(),
                            address: values.address.trim(),
                            city: values.city.trim(),
                            image: values.image.trim(),
                            gender: values.gender.trim(),
                            designation: values.designation.trim(),
                            salary: values.salary,
                            date_hired: values.date_hired
                        }).then((data) => {
                            if (data.success) resetForm();
                        });
                    } catch (err) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, handleReset, isSubmitting, touched, values, setFieldValue }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12}>
                                <Divider>
                                    <Chip label="PERSONAL" />
                                </Divider>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="first_name">First name</InputLabel>
                                    <OutlinedInput
                                        id="first_name"
                                        type="text"
                                        value={values.first_name}
                                        name="first_name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter First name"
                                        disabled={_isSubmitting}
                                        fullWidth
                                        error={Boolean(touched.first_name && errors.first_name)}
                                    />
                                    {touched.first_name && errors.first_name && (
                                        <FormHelperText error id="standard-weight-helper-text-first_name">
                                            {errors.first_name}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="last_name">Last name</InputLabel>
                                    <OutlinedInput
                                        id="last_name"
                                        type="text"
                                        value={values.last_name}
                                        name="last_name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter Last name"
                                        disabled={_isSubmitting}
                                        fullWidth
                                        error={Boolean(touched.last_name && errors.last_name)}
                                    />
                                    {touched.last_name && errors.last_name && (
                                        <FormHelperText error id="standard-weight-helper-text-last_name">
                                            {errors.last_name}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="full_name">Full Name</InputLabel>
                                    <OutlinedInput
                                        id="full_name"
                                        type="text"
                                        value={values.full_name}
                                        name="full_name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter Full Name"
                                        disabled={_isSubmitting}
                                        fullWidth
                                        error={Boolean(touched.full_name && errors.full_name)}
                                    />
                                    {touched.full_name && errors.full_name && (
                                        <FormHelperText error id="standard-weight-helper-text-full_name">
                                            {errors.full_name}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email">Email</InputLabel>
                                    <OutlinedInput
                                        id="email"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter Email"
                                        disabled={_isSubmitting}
                                        fullWidth
                                        error={Boolean(touched.email && errors.email)}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="standard-weight-helper-text-email">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="tel">Contact number {`(optional)`}</InputLabel>
                                    <OutlinedInput
                                        id="tel"
                                        type="tel"
                                        value={values.tel}
                                        name="tel"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter Contact number"
                                        disabled={_isSubmitting}
                                        fullWidth
                                        error={Boolean(touched.tel && errors.tel)}
                                    />
                                    {touched.tel && errors.tel && (
                                        <FormHelperText error id="standard-weight-helper-text-tel">
                                            {errors.tel}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="nic">NIC Number</InputLabel>
                                    <OutlinedInput
                                        id="nic"
                                        type="text"
                                        value={values.nic}
                                        name="nic"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter NIC No"
                                        disabled={_isSubmitting}
                                        fullWidth
                                        error={Boolean(touched.nic && errors.nic)}
                                    />
                                    {touched.nic && errors.nic && (
                                        <FormHelperText error id="standard-weight-helper-text-nic">
                                            {errors.nic}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="city">City {`(optional)`}</InputLabel>
                                    <OutlinedInput
                                        id="city"
                                        type="text"
                                        value={values.city}
                                        name="city"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter city"
                                        disabled={_isSubmitting}
                                        fullWidth
                                        error={Boolean(touched.city && errors.city)}
                                    />
                                    {touched.city && errors.city && (
                                        <FormHelperText error id="standard-weight-helper-text-city">
                                            {errors.city}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="address">Address {`(optional)`}</InputLabel>
                                    <OutlinedInput
                                        id="address"
                                        type="text"
                                        value={values.address}
                                        name="address"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter address"
                                        disabled={_isSubmitting}
                                        fullWidth
                                        error={Boolean(touched.address && errors.address)}
                                    />
                                    {touched.address && errors.address && (
                                        <FormHelperText error id="standard-weight-helper-text-address">
                                            {errors.address}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="address">Gender</InputLabel>
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="gender"
                                            onChange={handleChange}
                                            defaultValue="Male"
                                        >
                                            <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                            <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                        </RadioGroup>
                                    </FormControl>
                                </Stack>
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <Divider>
                                    <Chip label="EMPLOYEEMENT" />
                                </Divider>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="emp_id">Employee ID</InputLabel>
                                    <OutlinedInput
                                        id="emp_id"
                                        type="text"
                                        value={values.emp_id}
                                        name="emp_id"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter Employee ID"
                                        disabled={_isSubmitting}
                                        fullWidth
                                        error={Boolean(touched.emp_id && errors.emp_id)}
                                    />
                                    {touched.emp_id && errors.emp_id && (
                                        <FormHelperText error id="standard-weight-helper-text-emp_id">
                                            {errors.emp_id}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="emp_id">Date Hired</InputLabel>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            views={['day']}
                                            label=""
                                            name="date_hired"
                                            value={values.date_hired}
                                            onChange={(value) => {
                                                //value.toISOString()
                                                setFieldValue('date_hired', value !== null ? value.toISOString() : values.date_hired);
                                            }}
                                            renderInput={(params) => <TextField {...params} helperText={null} />}
                                        />
                                    </LocalizationProvider>
                                </Stack>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="salary">Salary</InputLabel>
                                    <OutlinedInput
                                        id="salary"
                                        type="number"
                                        value={values.salary}
                                        name="salary"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter salary"
                                        disabled={_isSubmitting}
                                        fullWidth
                                        error={Boolean(touched.salary && errors.salary)}
                                    />
                                    {touched.salary && errors.salary && (
                                        <FormHelperText error id="standard-weight-helper-text-salary">
                                            {errors.salary}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="salary">Designation</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        value={values.designation}
                                        onChange={(e, child) => {
                                            setFieldValue('designation', e.target.value !== null ? e.target.value : values.designation);
                                        }}
                                        autoWidth
                                        label="Designation"
                                    >
                                        <MenuItem value={'Clerk'}>Clerk</MenuItem>
                                        <MenuItem value={'Account Manager'}>Account Manager</MenuItem>
                                        <MenuItem value={'Store Keeper'}>Store Keeper</MenuItem>
                                    </Select>
                                    {touched.designation && errors.designation && (
                                        <FormHelperText error id="standard-weight-helper-text-designation">
                                            {errors.designation}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            {error !== '' && (
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" sx={{ color: '##595959' }}>
                                        <span style={{ color: '#FF6347' }}>ERROR: </span>
                                        {error}
                                    </Typography>
                                </Grid>
                            )}

                            {_isSubmitting && (
                                <Grid item xs={12}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5vh' }}>
                                        <CircularProgress />
                                    </Box>
                                </Grid>
                            )}

                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12} md={6}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={_isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="reset"
                                        variant="contained"
                                        color="secondary"
                                        onClick={handleReset}
                                    >
                                        Reset
                                    </Button>
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={_isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        {employee ? 'Update' : 'Save'}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default EmpForm;
