import { ScheduleOutlined } from '@ant-design/icons';

const icons = {
    ScheduleOutlined
};

const pages = {
    id: 'attendance',
    title: 'Attendance',
    type: 'group',
    children: [
        {
            id: 'manage_attendance',
            title: 'Insert',
            type: 'item',
            url: '/attendance/insert',
            icon: icons.ScheduleOutlined
        }
    ]
};

export default pages;
