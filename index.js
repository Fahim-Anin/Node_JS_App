const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

let users = [];

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/signup', (req, res) => {
    const { email, password } = req.body;
    if (users.find(user => user.email === email)) {
        console.log('Existing email:', email);
        return res.json({ message: 'Email already exists.' });
    }
    users.push({ email, password });
    console.log('Main array after sign up:', users); 
    res.json({ message: 'Sign up successful. Please log in.' });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        console.log('Successful login:', email);
        res.json({ success: true });
    } else {
        console.log('Failed login:', email);
        res.json({ success: false, message: 'Invalid email or password.' });
    }
});

app.get('/welcome', (req, res) => {
    res.send('<h1>Welcome!</h1>');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
