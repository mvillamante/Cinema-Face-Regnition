const express = require('express');
const oracledb = require('oracledb');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://192.168.18.95:5500' /*Change this to your local IP address*/
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
        } else {0
            await connection.execute(
                'INSERT INTO UserAccount (Username, Password) VALUES (:username, :password)',
                [username, password]
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

// save user info API
app.post('/api/saveUser', async (req, res) => {
    const { username, firstName, lastName, email, cellphoneNum } = req.body;

    const fullName = `${firstName} ${lastName}`;
    let connection;
    try {
        connection = await oracledb.getConnection({
            user: 'SYSTEM',
            password: 'admin',
            connectString: 'localhost/XEPDB1'
        });

        const result = await connection.execute(
        'INSERT INTO UserInfo (username, FullName, Email, CellNo) VALUES (:username, :fullName, :email, :cellphoneNum)',
                [username, fullName, email, cellphoneNum]
            );
        await connection.commit();
        res.status(201).send('User information saved successfully!');

    } catch (err) {
        res.status(500).send('An error occurred while saving the user.');
        console.error(err);
    } finally {
        if (connection) await connection.close();
    }
}); 

app.post('/api/retrieveInfo', async (req, res) => {
    const { username } = req.body;

    try {
        connection = await oracledb.getConnection({
            user: 'SYSTEM',
            password: 'admin',
            connectString: 'localhost/XEPDB1'
        });
        
        const result = await connection.execute(`SELECT * FROM UserInfo WHERE userName = :username`,
            [username]
        );

        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json([]);
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

app.post('/api/retrieveFullName', async (req, res) => {
    const { username } = req.body;
    
    let connection;

    try {
        connection = await oracledb.getConnection({
            user: 'SYSTEM',
            password: 'admin',
            connectString: 'localhost/XEPDB1'
        });
        
        const result = await connection.execute(`SELECT fullName FROM UserInfo WHERE userName = :username`,
            [username]
        );

        if (result.rows.length > 0) {
            res.status(200).json(result.rows.map(row => row[0]));
        } else {
            res.status(404).json([]);
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


app.post('/api/bookTickets', async (req, res) => {
    const { username, movieId, selectedSeats, bookingDateTime } = req.body;

    let connection;

    try {
        connection = await oracledb.getConnection({
            user: 'SYSTEM',
            password: 'admin',
            connectString: 'localhost/XEPDB1'
        }); 
        for (const seatNo of selectedSeats) {
            await connection.execute(
                `INSERT INTO Booking (userName, movieID, seatNo, bookDate)  VALUES (:username, :movieID, :seatNo, TO_TIMESTAMP(:bookingDateTime, 'YYYY-MM-DD HH24:MI:SS'))`,
            { username, movieId, seatNo, bookingDateTime }
        );
    }
        await connection.commit();
        res.status(201).json({ message: 'Booking successful!' });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while booking the tickets.', details: err.message });
        console.error(err);
    } finally {
        if (connection) await connection.close();
    }
});



app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});