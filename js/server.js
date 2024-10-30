const express = require('express');
const oracledb = require('oracledb');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://XXX.XXX.XXX.XXX:5500' /*Change this to your local IP address*/
}));


//signup API
app.post('/auth/signup', async(req, res) => {
    const { username, password } = req.body;

    let connection;
    try {
        connection = await oracledb.getConnection({
            user: 'SYSTEM',
            password: 'admin',
            connectString: 'localhost/XEPDB1'
        });

        const result = await connection.execute(
            'SELECT COUNT(*) AS UserCount FROM UserAccount WHERE Username = :username',
            [username]
        );

        if (result.rows[0][0] > 0) {
            res.status(400).send('Username already exists.');
        } else {
            await connection.execute(
                'INSERT INTO UserAccount (Username, Password) VALUES (:username, :password)',
                [username, password],
                { autocommit: true }
            );
            await connection.commit();
            res.status(200).send('Sign up successful!');
        }
    } catch (err) {
        res.status(500).send('An error occurred. Please try again later.');
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.err('Error during signup:', err);
                res.status(500).send('An error occurred. Please try again later.');
            }
        }
    }
});

//signin API
app.post('/auth/signin', async (req, res) => {
    const { username, password } = req.body;

    let connection;

    try {
        connection = await oracledb.getConnection({
            user: 'SYSTEM',
            password: 'admin',
            connectString: 'localhost/XEPDB1'
        });

        const result = await connection.execute(
            `SELECT * FROM UserAccount WHERE Username = :username AND Password = :password`,
            [ username, password ]
        );
        if (result.rows.length > 0) {
            res.status(200).send('Sign in successful!');
        } else {
            res.status(401).send('Invalid username or password. Please try again.');
        }
    } catch (err) {
        res.status(500).send('An error occurred. Please try again later.');
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});