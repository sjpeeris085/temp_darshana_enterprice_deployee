import { CalculatorOutlined } from '@ant-design/icons';

const icons = {
    CalculatorOutlined
};

const pages = {
    id: 'salary',
    title: 'Salary',
    type: 'group',
    children: [
        {
            id: 'manage_salary',
            title: 'Accounting Salary',
            type: 'item',
            url: '/salary/accounting',
            icon: icons.CalculatorOutlined
        }
    ]
};

export default pages;
