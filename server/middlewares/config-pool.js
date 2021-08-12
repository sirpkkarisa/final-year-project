require('dotenv/config');
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.connect()
    .then(
        () => console.log('Connected to postgres')
    )
    .catch(
        (error) => {
            console.log(error)
        }
    )
    module.exports = pool;