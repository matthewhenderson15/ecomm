const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const usersRepo = require('./repositories/users');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cookieSession({
        keys: ['alsdkfj12asdfa1239asfmxks']
    })
);

app.get('/', (req, res) => {
    res.send(`
        <div>
            Your id is: ${req.session.userId}
            <form method="POST">
                <input name="email" placeholder="email" />
                <input name="password" placeholder="password" />
                <input name="passwordConfirmation" placeholder="password confirmation" />
                <button>Sign up</button>
            </form>
        </div>
    `);
});

app.post('/', async (req, res) => {
    const { email, password, passwordConfirmation } = req.body
    
    const existingUser = await usersRepo.getOneBy({ email });
    if (existingUser) {
        return res.send('Email in use')
    }

    if (password !== passwordConfirmation) {
        return res.send('Passwords must match');
    }

    // Create user after validating email and password
    const user = await usersRepo.create({ email, password });

    // Get id and store in cookie
    req.session.userId = user.id;

    res.send('Account created!');
});

app.listen(3000, () => {
    console.log('Listening');
});