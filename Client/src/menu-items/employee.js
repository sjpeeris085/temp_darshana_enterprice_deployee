import { UserSwitchOutlined } from '@ant-design/icons';

const icons = {
    UserSwitchOutlined
};

const pages = {
    id: 'employee',
    title: 'Employees',
    type: 'group',
    children: [
        {
            id: 'manage_employeess',
            title: 'Manage employeess',
            type: 'item',
            url: '/Employees/manage',
            icon: icons.UserSwitchOutlined
        }
    ]
};

export default pages;
