const pool = require('../middlewares/config-pool');

exports.userTable = () => {
    pool.query(`CREATE TABLE IF NOT EXISTS
    lu_users(
        user_id UUID,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        gender  VARCHAR(100),
        reg_no VARCHAR(100) NOT NULL,
        password VARCHAR(255) NOT NULL,
        degree_course VARCHAR(255),
        reset_password_token VARCHAR(255),
        UNIQUE(email),
        UNIQUE(reg_no),
        PRIMARY KEY(user_id)
    )`)
    .then(() => console.log('User table created '))
    .catch((error) => console.log(error));

}