const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');

exports.getLogin = (req, res) => {
    res.render('auth/login', { error: null });
};
function parseUserJSON() {
    if (!fs.existsSync(usersFilePath)) {
        fs.writeFileSync(usersFilePath, JSON.stringify([]))
    }
    const data = fs.readFileSync(usersFilePath);
    return JSON.parse(data);
}

exports.getRegister = (req, res) => {
    res.render('auth/register', { error: null });
};
exports.postLogin = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.render('auth/login', { error: 'enter all fields' })
    }

    const users = parseUserJSON();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.render('auth/login', { error: 'incorrect user/password' })
    }

    req.session.user = { email: user.email, name: user.name };
    res.redirect('/video/dashboard');
};
exports.postRegister = (req, res) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
        return res.render('auth/register', { error: 'enter all fields' })
    }

    const users = parseUserJSON();
    const userExists = users.find(user => user.email === email);

    if (userExists) {
        return res.render('auth/register', { error: 'please login with your existing account' })
    }

    users.push({ email, name, password })
    saveUserHELPER(users);

    res.render('auth/account_created')
};
function saveUserHELPER(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2))
}



