const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const videoRoutes = require('./routes/videoRoutes');

const app = express();

// as defined in the assignment
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use('/static_files', express.static(path.join(__dirname, 'static_files'))); // css

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/auth', authRoutes);
app.use('/video', videoRoutes);

// auto directs to main page
app.get('/', (req, res) => {
  res.redirect('/auth/login');
});

app.listen(3000, () => {
  console.log(`Click this to go to page http://localhost:3000/`); // just visit url
});
