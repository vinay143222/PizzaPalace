import bcrypt from 'bcryptjs';
const data = {
    user: [{
            name: 'vinaykumar',
            email: 'vinaykumarhmvini@gmail.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true,
        },
        {
            name: 'vishnu',
            email: 'vishnuss@gmail.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true,
        }
    ]
}
export default data;